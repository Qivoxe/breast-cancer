// =========================
// FIELD LIST
// =========================

const fields = [
    "radius_mean",
    "texture_mean",
    "perimeter_mean",
    "area_mean",
    "smoothness_mean",
    "compactness_mean",
    "concavity_mean",
    "concave_points_mean",
    "symmetry_mean",
    "fractal_dimension_mean",

    "radius_se",
    "texture_se",
    "perimeter_se",
    "area_se",
    "smoothness_se",
    "compactness_se",
    "concavity_se",
    "concave_points_se",
    "symmetry_se",
    "fractal_dimension_se",

    "radius_worst",
    "texture_worst",
    "perimeter_worst",
    "area_worst",
    "smoothness_worst",
    "compactness_worst",
    "concavity_worst",
    "concave_points_worst",
    "symmetry_worst",
    "fractal_dimension_worst"
];


// =========================
// EXAMPLE DATA
// =========================

const exampleData = {
    radius_mean: 17.99,
    texture_mean: 10.38,
    perimeter_mean: 122.8,
    area_mean: 1001.0,
    smoothness_mean: 0.1184,
    compactness_mean: 0.2776,
    concavity_mean: 0.3001,
    concave_points_mean: 0.1471,
    symmetry_mean: 0.2419,
    fractal_dimension_mean: 0.07871,

    radius_se: 1.095,
    texture_se: 0.9053,
    perimeter_se: 8.589,
    area_se: 153.4,
    smoothness_se: 0.006399,
    compactness_se: 0.04904,
    concavity_se: 0.05373,
    concave_points_se: 0.01587,
    symmetry_se: 0.03003,
    fractal_dimension_se: 0.006193,

    radius_worst: 25.38,
    texture_worst: 17.33,
    perimeter_worst: 184.6,
    area_worst: 2019.0,
    smoothness_worst: 0.1622,
    compactness_worst: 0.6656,
    concavity_worst: 0.7119,
    concave_points_worst: 0.2654,
    symmetry_worst: 0.4601,
    fractal_dimension_worst: 0.1189
};


// =========================
// DOM ELEMENTS
// =========================

const form = document.getElementById("prediction-form");

const exampleButton = document.getElementById("example-btn");

const resetButton = document.getElementById("reset-btn");

const predictButton = document.getElementById("predict-btn");

const buttonText = document.getElementById("button-text");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const diagnosis = document.getElementById("diagnosis");

const probability = document.getElementById("probability");

const probabilityBar = document.getElementById("probability-bar");

const resultDescription = document.getElementById("result-description");


// =========================
// LOAD EXAMPLE
// =========================

exampleButton.addEventListener("click", () => {

    fields.forEach(field => {

        document.getElementById(field).value = exampleData[field];

    });

    result.classList.add("hidden");

});


// =========================
// RESET FORM
// =========================

resetButton.addEventListener("click", () => {

    form.reset();

    result.classList.add("hidden");

    probabilityBar.style.width = "0%";

});


// =========================
// PREDICTION
// =========================

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    // -------------------------
    // SHOW LOADING
    // -------------------------

    predictButton.disabled = true;

    buttonText.classList.add("hidden");

    loading.classList.remove("hidden");


    // -------------------------
    // COLLECT INPUTS
    // -------------------------

    const data = {};

    fields.forEach(field => {

        const value = document.getElementById(field).value;

        data[field] = Number(value);

    });


    try {

        // -------------------------
        // SEND REQUEST
        // -------------------------

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        // -------------------------
        // HANDLE API ERROR
        // -------------------------

        if (!response.ok) {

            const errorData = await response.json();

            console.error("API Error:", errorData);

            throw new Error(
                "Prediction request failed."
            );

        }


        // -------------------------
        // GET RESULT
        // -------------------------

        const resultData = await response.json();


        const diagnosisValue = resultData.diagnosis;

        const probabilityValue =
            resultData.probability[
                diagnosisValue.toLowerCase()
            ];


        const percentage =
            probabilityValue * 100;


        // -------------------------
        // DISPLAY RESULT
        // -------------------------

        diagnosis.textContent = diagnosisValue;

        probability.textContent =
            percentage.toFixed(2) + "%";


        probabilityBar.style.width =
            percentage + "%";


        // -------------------------
        // DESCRIPTION
        // -------------------------

        if (diagnosisValue === "Malignant") {

            resultDescription.textContent =
                "The model classified this sample as malignant.";

            result.classList.add("malignant");

            result.classList.remove("benign");

        } else {

            resultDescription.textContent =
                "The model classified this sample as benign.";

            result.classList.add("benign");

            result.classList.remove("malignant");

        }


        // -------------------------
        // SHOW RESULT
        // -------------------------

        result.classList.remove("hidden");


        // Scroll to result

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    catch (error) {

        console.error(error);

        alert(
            "Unable to get prediction. Make sure the FastAPI server is running."
        );

    }


    finally {

        predictButton.disabled = false;

        buttonText.classList.remove("hidden");

        loading.classList.add("hidden");

    }

});