
import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";


export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".menu-container");

    const username = getUsername();

    let authLink = `<a href="login.html" class="nav-link  ${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `
       
        <a href="add.html" class="nav-link ${pathname === "/add.html" ? "active" : ""}">Add Product</a>
        <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
        <button id="logout" type="button" class="btn  btn-outline-secondary">Logout${username}</button>    
        </li>
        `;
    }

    container.innerHTML = `
    <nav class="start-header start-style navbar navbar-expand-lg navbar-light bg-light navigation-wrap bg-light ">
    <div class="container-fluid">
    <a class="navbar-brand" href="/" target="_blank"><img class="logoimage" src="logo/logo.jpg" alt=""></a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
          <a href="/" class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
          </li>
          <li class="nav-item">
          ${authLink}
          </li>
        </ul>
      
    </div>
  </nav>
  
  `;

  logoutButton();
}