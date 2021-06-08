

import { getUsername } from "../../utils/storage.js";

export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".menu-container");

    const username = getUsername();

    let authLink = ` <a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `
        <br>
        <span>Hi ${username}</span>
        `;
    }

    console.log(username);

    container.innerHTML = `<div class="container pt-5">
                                <button type="button" class="btn btn-outline-secondary ${pathname === "/" ? "active" : ""} ">Home</button>
                                ${authLink}
                        </div>`;
}
