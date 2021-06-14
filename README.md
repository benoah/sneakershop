# Sneakershop


## To start install strapi.
### cd api
### npm install

### username: admin@admin.com 
### password: Pass1234

- To start front end use vscode live server, or any npm server you like using, they are static files.

# GOAL 

#### To create an e-commerce website that has an Admin and Front-End respectively. The Front-End should be responsive and the website is to be populated by an API supplied by Noroff.
<br>

# tech
- Use vanilla (regular) JavaScript for the project and spliting  code up using modules (imports/exports).



### Customer pages
- A hero banner with an image that is uploaded to Strapi.
- A list of featured products.

- In Strapi each product must have a featured flag that can be turned on or off. When the flag is on, the product shall be displayed on the homepage.


### Products page
- A list of all products added to Strapi. Each product must display its title, price and image. 

- The product shall link to its products detail page. A search text box. When searching, the products that include the searched text in their title or description shall be listed.

### Product details page
#### The product details page must include:
- the product title,
- the product description,
- the product image,
- the product’s price, an add to cart button.

### Cart/Basket page

- The cart/basket page must display a list of all products added to cart. Load the items that have been added to local storage and display them on the page.

#### Each product in the cart must display:
<br>

-  the product title,
- the product’s price,
- a link to the product view page, and optionally display the product image,
- After the list of products, display the total price of all the products in the cart.



## Admin section

- Category filters & price filter (on product list page)


### Login/Logout
- Create an admin login form that allows administrator users to login.

- Use localStorage to keep the user logged in.
- When logged in, display a logout button in the layout the logs the user out.
- Logging out should not clear items not related to login from localStorage.

