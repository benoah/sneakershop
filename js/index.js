import { baseUrl } from "./settings/Url.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

const productsUrl = baseUrl + "products";

createMenu();

(async function () {
    const container = document.querySelector(".product-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `
          
            <div class="card col">
  <img src="${product.image}" class="card-img-top" alt="...">
  <div class="card-body ">
    <h5 class="card-title">${product.brand}</h5>
    <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
    <p class="card-text">${product.description}</p>
    <p class="text-muted">${product.price}</div>
    <a class="product-box" href="edit.html?id=${product.id}">
    <button type="button">Edit</button>
    </a>
  </div>
</div>
                                    
                                    
                                    `;
        });
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    }
})();


/**
 *     <!---product------------------------------------>
                                    <section class="product">
                                        <!--sale-box-1-------------------->
                                        <div class="product-card">
                                           
                                                <div class="product-text">
                                                <h2>${product.brand} </h2>
                                                <h3>${product.category}</h3>
                                                <p class ="content">${product.description}</p>
                                                <div class="product-price-btn">
                                                <p><span>${product.price}$</span></p>
                                                <a class="product-box" href="edit.html?id=${product.id}">
                                                <button type="button">Edit</button>
                                                </a>
                                                </div>
                                                  </div>
 */