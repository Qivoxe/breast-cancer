# 🧬 Breast Cancer Prediction

An end-to-end machine learning application that classifies breast tumor samples as **Benign** or **Malignant** using a Support Vector Machine (SVM).

The project covers the complete ML workflow — from exploratory data analysis and model comparison to hyperparameter tuning, model serialization, FastAPI deployment, and a web-based frontend.

> ⚠️ **Disclaimer:** This project is for educational and demonstration purposes only. It is not a medical diagnostic system.

---

## 🚀 Features

- Exploratory Data Analysis (EDA)
- Data preprocessing and feature scaling
- Multiple ML model comparison
- Stratified 5-fold cross-validation
- SVM hyperparameter tuning with GridSearchCV
- ROC-AUC evaluation
- Confusion matrix and classification metrics
- Serialized production model using Joblib
- REST API built with FastAPI
- Interactive web frontend
- Example input loader
- Prediction probability visualization
- Responsive UI

---

## 🧠 Machine Learning Pipeline

```text
Breast Cancer Dataset
        │
        ▼
Data Cleaning
        │
        ▼
Exploratory Data Analysis
        │
        ▼
Feature / Target Separation
        │
        ▼
Train-Test Split
        │
        ▼
Feature Scaling
        │
        ▼
Model Comparison
        │
        ▼
5-Fold Stratified Cross-Validation
        │
        ▼
SVM Hyperparameter Tuning
        │
        ▼
Final SVM Model
        │
        ▼
Joblib Model Serialization
        │
        ▼
FastAPI Backend
        │
        ▼
Web Frontend
```

---

## 📊 Dataset

The project uses the **Breast Cancer Wisconsin (Diagnostic)** dataset.

The dataset contains:

- **569 samples**
- **30 numerical diagnostic features**
- **1 target variable**
- `B` → Benign
- `M` → Malignant

The original dataset also contains an `id` column, which was removed before model training.

### Feature Groups

The 30 features are divided into three groups:

1. Mean features
2. Standard error (`SE`) features
3. Worst features

Examples include:

```text
radius_mean
texture_mean
perimeter_mean
area_mean
smoothness_mean
compactness_mean
concavity_mean
concave_points_mean
```

---

## 🔎 Exploratory Data Analysis

The analysis included:

- Dataset structure and data types
- Missing-value analysis
- Target distribution
- Descriptive statistics
- Duplicate checking
- Feature correlation analysis
- Correlation heatmap
- Feature distribution analysis
- Boxplots

The analysis showed strong correlations between several geometric measurements, particularly radius, perimeter, and area-related features.

---

## 🤖 Models Evaluated

The following models were compared:

- Logistic Regression
- K-Nearest Neighbors
- Support Vector Machine
- Decision Tree
- Random Forest

### 5-Fold Cross-Validation Results

| Model               |   Accuracy | Precision |     Recall |         F1 | ROC-AUC |
| ------------------- | ---------: | --------: | ---------: | ---------: | ------: |
| Logistic Regression |     0.9737 |    0.9863 |     0.9436 |     0.9633 |  0.9953 |
| SVM                 | **0.9772** |    0.9810 | **0.9576** | **0.9688** |  0.9945 |
| Random Forest       |     0.9543 |    0.9463 |     0.9341 |     0.9382 |  0.9896 |
| KNN                 |     0.9631 |    0.9755 |     0.9246 |     0.9487 |  0.9849 |
| Decision Tree       |     0.9104 |    0.8963 |     0.8588 |     0.8757 |  0.9000 |

Cross-validation used:

```python
StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)
```

---

## ⚙️ SVM Hyperparameter Tuning

The SVM model was tuned using `GridSearchCV`.

Parameters explored included:

```text
C
gamma
kernel
```

The selected configuration was:

```text
C = 100
gamma = 0.001
kernel = rbf
```

Best cross-validation ROC-AUC:

```text
0.99598
```

The final model was trained as a pipeline containing:

```text
StandardScaler
      +
SVC(probability=True)
```

Using a pipeline ensures that feature scaling is applied consistently during prediction.

---

## 📈 Evaluation Metrics

The project evaluates the model using:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- Confusion Matrix
- ROC Curve

The untouched test set is kept separate from cross-validation and hyperparameter tuning for final evaluation.

---

## 💾 Model

The final trained model is serialized using Joblib:

```text
models/breast_cancer_svm.pkl
```

The saved pipeline contains both:

```text
StandardScaler
```

and:

```text
SVC
```

This allows the API to receive raw feature values and apply the same preprocessing used during training.

---

## ⚡ FastAPI Backend

The model is exposed through a REST API using FastAPI.

### Start the server

```bash
python -m uvicorn app1.main:app --reload
```

The application will be available at:

```text
http://127.0.0.1:8000/
```

### API Documentation

FastAPI automatically provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### Prediction Endpoint

```http
POST /predict
```

The endpoint accepts the 30 diagnostic features and returns:

```json
{
  "prediction": 1,
  "diagnosis": "Malignant",
  "probability": {
    "benign": 0.000001,
    "malignant": 0.999999
  }
}
```

The probability values represent the model's estimated class probabilities, not medical certainty.

---

## 🖥️ Frontend

The project includes a lightweight web interface built with:

- HTML
- CSS
- JavaScript

The frontend allows users to:

- Enter diagnostic measurements
- Load an example sample
- Submit a prediction
- View the predicted class
- View model probability
- Reset the form

Frontend files:

```text
app1/static/
├── index.html
├── style.css
└── script.js
```

---

## 📁 Project Structure

```text
breast-cancer-prediction/
│
├── app1/
│   ├── __init__.py
│   ├── main.py
│   │
│   └── static/
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── data/
│   └── breast_cancer.csv
│
├── models/
│   └── breast_cancer_svm.pkl
│
├── notebooks/
│   └── breast_cancer_analysis.ipynb
│
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🛠️ Tech Stack

### Machine Learning

- Python
- NumPy
- Pandas
- Scikit-learn
- Joblib

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- HTML
- CSS
- JavaScript

### Development

- Jupyter Notebook
- Git
- GitHub

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Qivoxe/breast-cancer.git
```

Move into the project:

```bash
cd breast-cancer-prediction-model
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## ▶️ Run Locally

Start FastAPI:

```bash
python -m uvicorn app1.main:app --reload
```

Open the application:

```text
http://127.0.0.1:8000/
```

Open API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🧪 Example Workflow

1. Open the web application.
2. Click **Load Example**.
3. Click **Predict Tumor**.
4. The frontend sends the 30 features to the FastAPI `/predict` endpoint.
5. FastAPI loads the serialized SVM pipeline.
6. The model generates a prediction and class probabilities.
7. The result is displayed in the frontend.

---

## ⚠️ Limitations

This project has several important limitations:

- The dataset is relatively small.
- The model is trained on a single public dataset.
- Performance on external clinical data may differ.
- Model probabilities should not be interpreted as clinical certainty.
- The application is not validated for real-world medical use.
- Predictions should not replace professional medical evaluation.

---

## 📌 Future Improvements

Possible extensions include:

- Docker containerization
- Cloud deployment
- Automated model retraining pipeline
- Experiment tracking
- Feature importance / model interpretability
- SHAP-based explanations
- Authentication and API security
- Automated testing
- CI/CD pipeline
- Model monitoring
- Improved frontend visualization

---

## 👨‍💻 Author

**Shivam Roy**

Machine Learning · Mathematics · Software Engineering

GitHub: `https://github.com/Qivoxe`

---

## ⭐ Project Purpose

This project was built to demonstrate an end-to-end machine learning workflow:

```text
Data → Analysis → Modeling → Validation → Tuning
                         ↓
                    Serialization
                         ↓
                    FastAPI API
                         ↓
                     Frontend
```

It combines machine learning, backend development, and frontend engineering into a single deployable application.
