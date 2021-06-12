import createMenu from "./components/common/createMenu.js";
import { baseUrl } from "./settings/URL.js";
import displayMessage from "./components/common/displayMessage.js";

createMenu();

const productContainer = document.querySelector(".product-container");

const productsUrl = baseUrl + "products";

let allProducts;

async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    const products = json;
    allProducts = products;
    rennderProducts(products);
    //  searchProducts(products)
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
}

getProducts();

function rennderProducts(productsTorender) {
  productContainer.innerHTML = "";

  productsTorender.forEach(function (product) {
    productContainer.innerHTML += `
        <div class="col-md-4 col-lg-3 d-flex align-items-stretch pt-4">      
        <div class="card ">
        <div class="top-left">
        <i class="fa fa-heart"></i>
   </div>
   <a class="product-box" href="detail.html?id=${product.id}">       
        <img class="card-img-top" src="${product.image}" alt="Card image cap">
        </img>
        <div class="card-body product-desc">
             <span class="product-title card-title">
                ${product.brand}
             </span>
              <p><span class="product-caption">
        ${product.model}
      </span></p>
      <p><span class="product-price text-muted">
      $  ${product.price}
    </span></p>
        </div>
        </a>   
      </div>
    </div>
        
        
        </div>
                  
                  
        `;
  });
}
