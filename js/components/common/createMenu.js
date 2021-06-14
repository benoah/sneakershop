import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu-container");

  const username = getUsername();

  let authLink = `<a href="login.html" class="nav-link  ${
    pathname === "/login.html" ? "active" : ""
  }"><i class="fas fa-sign-in-alt"></i></a>`;

  if (username) {
    authLink = `
    <div class="">
    <li class="nav-item">
    <a href="/" class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Admin</a>
    </li>
        <a href="add.html" class="nav-link ${pathname === "/add.html" ? "active" : ""}">Add Product</a>
        <li class="nav-item">
        <button id="logout" type="button" class="btn btn-black">Logout<p class="text-muted">Hey ${username}</p></button>    
        </li>
    </div>


      
    


        `;
  }

  container.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container">
    <a class="navbar-brand" href="/shop.html" target="_blank"><img class="logoimage" src="logo/logo.jpg" alt=""></a>
        <ul class="navbar-nav">
        <a href="/shop.html" class="nav-link ">Shop</a>
        <a href="/chart.html" class="nav-link"><i class="fas fa-shopping-basket"></i></a>
          <li class="nav-item">
          ${authLink}
          </li>
        </ul>
    </div>
  </nav>
 
  `;
  logoutButton();
}
