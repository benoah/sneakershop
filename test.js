
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image_url = document.querySelector("#image_url");
const category = document.querySelector("#category");
const rating = document.querySelector("#rating");
const brand = document.querySelector("#brand")
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");


(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        image_url.value = details.image_url;
        category.value = details.category;
        rating.value = details.rating;
        brand.value = details.brand;
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

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image_url.value.trim();
    const categoryValue = category.value.trim();
    const ratingValue = parseFloat(rating.value);
    const brandValue = brand.value.trim();

    const idValue = idInput.value;

    if (priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageValue.length === 0 || categoryValue.length === 0 || ratingValue.length === 0 || brandValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, imageValue, categoryValue, ratingValue, brandValue, idValue);
}

async function updateProduct(title, price, description, image_url, category, rating, brand, id) {
    const url = baseUrl + "products/" + id;
    
    const data = JSON.stringify({
        title: title,
        price: price,
        description: description,
        image_url: image_url,
        category: category,
        rating: rating,
        brand: brand
    });

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



