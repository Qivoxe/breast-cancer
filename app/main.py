from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(
    title="Breast Cancer Prediction API",
    description="Machine learning API for breast tumor classification",
    version="1.0.0"
)

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


@app.get("/app")
def serve_frontend():
    return FileResponse("app/static/index.html")

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "breast_cancer_svm.pkl"
)

model =joblib.load(MODEL_PATH)

class BreastCancerInput(BaseModel):

    radius_mean: float
    texture_mean: float
    perimeter_mean: float
    area_mean: float
    smoothness_mean: float
    compactness_mean: float
    concavity_mean: float
    concave_points_mean: float
    symmetry_mean: float
    fractal_dimension_mean: float

    radius_se: float
    texture_se: float
    perimeter_se: float
    area_se: float
    smoothness_se: float
    compactness_se: float
    concavity_se: float
    concave_points_se: float
    symmetry_se: float
    fractal_dimension_se: float

    radius_worst: float
    texture_worst: float
    perimeter_worst: float
    area_worst: float
    smoothness_worst: float
    compactness_worst: float
    concavity_worst: float
    concave_points_worst: float
    symmetry_worst: float
    fractal_dimension_worst: float




@app.get("/")
def home():
    return {
        "message": "Breast Cancer Prediction API is running",
        "status": "success"
    }

@app.post("/predict")
def predict(data: BreastCancerInput):

    input_data = pd.DataFrame([data.model_dump()])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0]

    if prediction == 1:
        diagnosis = "Malignant"
    else:
        diagnosis = "Benign"

    return {
    "prediction": int(prediction),
    "diagnosis": diagnosis,
    "probability": {
        "benign": float(probability[0]),
        "malignant": float(probability[1])
    }
}