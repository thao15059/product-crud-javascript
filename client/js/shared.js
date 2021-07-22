const API_URL = "http://localhost:3000/api";

function getIdFromQuery() {
  return window.location.search.match(/\?id=([0-9]+)/)[1];
}

const addProductToPage = (product, size, buttons, parent) => {
  const productDiv = document.createElement("div");
  parent.appendChild(productDiv);
  productDiv.outerHTML = `
      <div class="card col-sm-6 col-md-${size}" >
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">$${product.price}</p>
          <p class="card-text">${product.quantity} left in stock</p>
          ${buttons}
        </div>
      </div>
    `;
};

const getProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return await response.json();
};
