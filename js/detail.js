import { baseUrl } from "./settings/URL.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js"
import { getExistingFavs, saveFavs } from "./utils/getExistingFavs.js";

createMenu()

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
    document.location.href = "./shop.html";
}

const productUrl = baseUrl + "products/" + id;


const favourites = getExistingFavs();


(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        document.title = details.brand;

        const container = document.querySelector(".detail-container");
        container.innerHTML = `
        <div class="card">
        <div class="row"> 
        <div class="col-md-6">
        <p class="tex-uppercase text-muted">Shop / ${details.brand} / <a>${details.model}</a></p>
        <img src="${details.image} " alt="${details.brand}/${details.model}" class="img-fluid detailimage" id="theimage">
        </div>
        <div class="col-md-6 col-12 p-5">
        <div class="row">      
        <div class="col">
        <h2>${details.brand}</h2>
        <p class="style"> ${details.model}</p>
        <span class="fas fa-star checked"></span>
        <span class="fas fa-star checked"></span>
        <span class="fas fa-star checked"></span>
        <span class="fas fa-star checked"></span>
        <span class="fas fa-star-half-alt checked"></span>
        <span id="reviews"> 1125 Reviews</span>
        <p>${details.description}</p>
        </div>
        <div class="col-2">        
        <i class=" far fa-shopping-cart" fa-shopping-cart" data-id="${details.id}" data-name="${details.brand}" data-price="${details.price}"  data-image="${details.image}"></i>
        </div>
        </div>
    </div>
      </div>
        </div> `;

        const favButtons = document.querySelector(".detail-container i");
         favButtons.addEventListener("click", handleClick);
       
        
    
    } catch (error) {
        displayMessage("error", error, ".detail-container");
    }
})();


function handleClick() {

    this.classList.toggle("fa");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentFavs = getExistingFavs();

    const productExists = currentFavs.find(function (fav) {
        return fav.id === id;
    });
    if (productExists === undefined) {
        const product = { id: id, name: name, price: price, image: image };
        currentFavs.push(product);
        saveFavs(currentFavs);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
    }
}



