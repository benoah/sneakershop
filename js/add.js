import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
    location.href = "/";
}


createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image_url = document.querySelector("#image_url");
const category = document.querySelector("#category");
const rating = document.querySelector("#rating");
const brand = document.querySelector("#brand")







const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image_url.value.trim();
    const categoryValue = category.value.trim();
    const ratingValue = parseFloat(rating.value);
    const brandValue = brand.value.trim();




    if (titleValue.length === 0 || brandValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0
        || imageValue.length === 0 || categoryValue.length === 0 || ratingValue.length === 0 || isNaN(ratingValue)
    ) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageValue, categoryValue, brandValue, ratingValue);
}







async function addProduct(title, price, description, image_url, category, brand, rating) {
    const url = baseUrl + "products";

    const data = JSON.stringify({
        title: title, price: price, description: description, brand: brand, image_url: image_url,
        category: category, rating: rating
    });


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
