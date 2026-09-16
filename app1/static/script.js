const form = document.getElementById("prediction-form");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

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

    const data = {};

    fields.forEach(function (field) {
        data[field] = Number(document.getElementById(field).value);
    });


    try {

        const response = await fetch("/predict", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });


        const result = await response.json();

        if (!response.ok) {
            throw new Error("Prediction request failed");
        }


        document.getElementById("result").classList.remove("hidden");

        document.getElementById("diagnosis").textContent =
            result.diagnosis;

        document.getElementById("probability").textContent =
            (result.probability[result.diagnosis.toLowerCase()] * 100)
            .toFixed(2) + "%";

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong while making the prediction.");

    }

});