import createMenu from "./components/common/createMenu.js"
import { BASE_URL } from "./settings/URL.js"
import displayMessage from "./components/common/displayMessage.js";
import { getExistingFavs, saveFavs } from "./utils/getExistingFavs.js";
createMenu()


const productContainer = document.querySelector(".product-container");

const productsUrl = BASE_URL + "products";

let allProducts;

async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const products = json;
        allProducts = products;
        rennderProducts(products);

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    }
}

getProducts();


const favourites = getExistingFavs();

function rennderProducts(productsTorender) {

    productContainer.innerHTML = "";
    productsTorender.forEach(function (product) {
        let cssClass = "far";

        const doesObjectExist = favourites.find(function (fav) {
            return parseInt(fav.id) === product.id;
        });
        if (doesObjectExist) {
            cssClass = "fa";
        }
        productContainer.innerHTML += `
        <div class="productcard col-md-4 col-lg-4 d-flex align-items-stretch pt-4">
        <div class="card">
            <a class="product-box" href="detail.html?id=${product.id}" >  
        <img class="card-img-top" src="${product.image}" alt="Card image cap">
          <div class="container card-content ">
          <div class="row>
            <div class="col">
            <h2>${product.brand}</h2>
        
            <p>${product.model}</p>
            <p>${product.price} NOK</p>
            </a>
        </div>
        <div class="bottom-right">
        <i class="${cssClass} fa-shopping-cart" data-id="${product.id}" data-name="${product.brand}" data-price="${product.price}"  data-photo="${product.image}"></i>
        </div>
            </div>
          </div>
        </div>
      </div>`;
    });

    const favButtons = document.querySelectorAll(".bottom-right i");
    favButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
    const search = document.querySelector(".search");
    search.onkeyup = function (event) {
        console.log("allProducts: ", allProducts);
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = allProducts.filter(function (product) {
            if (product.brand.toLowerCase().startsWith(searchValue)) {
                return true;
            }
        });
        rennderProducts(filteredProducts);
    };

}

function handleClick() {
    // console.log(event);
    this.classList.toggle("fa");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const photo = this.dataset.photo;

    const currentFavs = getExistingFavs();

    const productExists = currentFavs.find(function (fav) {
        return fav.id === id;
    });

    if (productExists === undefined) {
        const product = { id: id, name: name, price: price, photo: photo };
        currentFavs.push(product);
        saveFavs(currentFavs);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
    }
}




/**
 * 
 *       <a class="product-box" href="detail.html?id=${product.id}">Detail</a>
  <div class="col-md-4 col-lg-4 d-flex align-items-stretch pt-4">
    <div class="card">
    <img class="card-img-top" src="${product.image}" alt="Card image cap">
      <div class="container card-content ">
      <div class="row>
        <div class="col">
        <h2>${product.brand}</h2>
        <a class="product-box" href="detail.html?id=${product.id}">  
        <p>${product.model}</p>
        <p>${product.price} NOK</p>
        </a>
    </div>
    <div class="bottom-right">
    <i class="${cssClass} fa-shopping-cart" data-id="${product.id}" data-name="${product.brand}" data-price="${product.price}"  data-photo="${product.image}"></i>
    </div>
        </div>
      </div>
    </div>
  </div>
 */