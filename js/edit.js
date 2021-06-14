import { BASE_URL } from "./settings/URL.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const productUrl = BASE_URL + "products/" + id;

const form = document.querySelector("form");
const brand = document.querySelector("#brand");
const image = document.querySelector("#image")
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        brand.value = details.brand;
        model.value = details.model;
        image.value = details.image;
        price.value = details.price;
        description.value = details.description;
        idInput.value = details.id;
       
        deleteButton(details.id);

        console.log(details);
    } catch (error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const brandValue = brand.value.trim();
    const modelValue = model.value.trim();
    const imageValue = image.value.trim();

    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const idValue = idInput.value;

    if (brandValue.length === 0 || modelValue.length === 0 || imageValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(brandValue, modelValue, imageValue, priceValue, descriptionValue, idValue);
}

async function updateProduct(brand, model, image,  price, description, id) {
    const url = BASE_URL + "products/" + id;
    const data = JSON.stringify({ brand: brand, model:model, image:image, price: price, description: description });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}