import createMenu from "./components/common/createMenu.js";
import { getExistingFavs } from "./utils/getExistingFavs.js";

createMenu();

let charts = getExistingFavs();

const productContainer = document.querySelector(".cart");
const productPrice = document.querySelector(".cartprice");

if (charts.length === 0) {
  productContainer.innerHTML = "No favourites yet";
}

let totalPrice = 0;
let name = "";
let productprice = 0;

charts.forEach((chart) => {
  console.log(chart);
  const productContainer = document.querySelector(".cart");
  totalPrice = totalPrice + parseInt(chart.price);
  productprice = chart.price;
  name = chart.name;

  productContainer.innerHTML += `
  
  <div class="card p-5">
    <img class="card-img-top" src="${chart.photo}" alt="Card image cap">
    <div class="container card-content ">
    <div class="row>
        <div class="col">
            <h2>${chart.name}</h2>
           <p>${chart.price} NOK</p>
        </div>
        <div class="top-left">
        <i class="far fa-trash" id="clear" data-item="${chart.id}"></i>
        </div>
             </div>
        </div>
    </div>
`;
});

productPrice.innerHTML += `

   
       
     


<div class="summary">
<div>
    <h5><b>Cart Summary</b></h5>
</div>
<hr>
<div class="row">
    <h6 class="col">${name}  </h6>
    <div class="col text-right">${productprice}</div>
</div>
<hr>
<div class="row" ">
    <div class="col">TOTAL PRICE</div>
    <div class="col text-right">&euro; ${totalPrice}</div>
</div> 
<br>
<button class="btn btn-black">CHECKOUT</button>
</div>`;

const favButtons = document.querySelectorAll(".top-left i");
favButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick() {
  // console.log(event);
  this.classList.toggle("fa");
  this.classList.toggle("far");
  const id = this.dataset.item;

  const newFav = [];
  charts.forEach((fav) => {
    if (fav.id != id) {
      newFav.push(fav);
    }
  });
  saveFavs(newFav);
}

function saveFavs(favs) {
  console.log("new fav", favs);
  localStorage.setItem("favourites", JSON.stringify(favs));
  location.reload();
}
