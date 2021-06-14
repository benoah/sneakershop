
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { BASE_URL } from "./settings/URL.js";


const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const brand = document.querySelector("#brand");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const brandValue = brand.value.trim();
    const modelValue = model.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();

    console.log("priceValue", priceValue);

    if (brandValue.length === 0 || modelValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(brandValue, modelValue, priceValue, descriptionValue);
}

async function addProduct(brand, model, price, description) {
    const url = BASE_URL + "products";

    const data = JSON.stringify({ brand: brand, model:model, price: price, description: description });


    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}