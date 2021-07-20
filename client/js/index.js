/**
 * Elements
 */
const productsSection = document.querySelector("#products");

const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();
  showProducts(products);
};

const showProducts = (products) => {
  products.forEach((product) => {
    const buttons = `<a href="/client/product.html?id=${product.id}" class="btn btn-primary">View</a>`;
    addProductToPage(product, 4, buttons, productsSection);
  });
};

getProducts();
