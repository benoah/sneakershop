import { baseUrl } from "./settings/URL.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
createMenu();
const productsUrl = baseUrl + "products";


(async function () {
    const container = document.querySelector(".product-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `
            <div class="col-md-4 col-lg-3 d-flex align-items-stretch pt-4">
            <div class="card ">
            <img class="card-img-top" src="${product.image}" alt="Card image cap">
             <div class="top-left">
             <i class="fa fa-heart"></i>
             </div>
            </img>
            <div class="card-body product-desc">
            <span class="product-title card-title">
            <b>${product.brand}</b>
       </span>
            <p><span class="product-caption">
            ${product.model}
          </span></p>
 
          <p>  ${product.description}</p>
          <p><span class="product-price">
          $ <b> ${product.price}</b>
        </span></p>
            </div>
            <div class="card-footer bg-transparent">
            <div class="col">     <a class="product text-muted" href="edit.html?id=${product.id}">Edit Product</a></div> </div>
          </div>
          </div>
        </div>
            
            
            </div>
       `;
        });
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    }
})();

