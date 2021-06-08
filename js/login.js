import { baseUrl } from "./settings/URL.js";
import displayMessage from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";

import createMenu from "./components/common/createMenu.js";
createMenu();
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");
const userInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const passwordError = document.querySelector("#passwordError");
const UsernameError = document.querySelector("#UsernameError");




form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}



function validateForm(event) {
    event.preventDefault();

    if (checkLength(userInput.value, 0) === true) {
        UsernameError.style.display = "none";
    } else {
        UsernameError.style.display = "block";
    }

    if (checkLength(passwordInput.value, 3) === true) {
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "block";
    }
    console.log("hello");
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}



async function doLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        console.log(json);

        if (json.user) {
            //displayMessage("success", "Successfully logged in", ".message-container");
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}

