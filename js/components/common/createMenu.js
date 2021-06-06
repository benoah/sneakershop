import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".menu-container");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `<a href="add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Product</a>
            <li><button id="logout">Logout ${username}</button></li> `;
    }

    container.innerHTML = `
    
    <div class="menu">
    <ul class="menuItems">
    <li>
    <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Admin</a></li>
    <li> <a href="shop.html" class="${pathname === "/shop.html" || pathname === "/shop.html" ? "active" : ""}">Shop</a></li>
    <li> ${authLink}</li>
     </ul>

                        </div>`;

    logoutButton();
};



