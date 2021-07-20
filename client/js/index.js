const API_URL = "http://localhost:3000/api";

/**
 * Elements
 */
const productSection = document.querySelector("#product");

const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();
  showProducts(products);
};

const showProducts = (products) => {
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productSection.appendChild(productDiv);
    productDiv.outerHTML = `
      <div class="card col-sm-4" >
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <a href="/product.html?id=${product.id}" class="btn btn-primary">View</a>
        </div>
      </div>
    `;
  });
};

getProducts();
