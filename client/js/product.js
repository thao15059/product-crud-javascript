const productSection = document.querySelector("#product");
const productId = getIdFromQuery();

const getProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const product = await response.json();
  showProduct(product);
};

const showProduct = async (product) => {
  const buttons = `<a href="/edit.html?id=${product.id}" class="btn btn-success">Edit</a>`;
  addProductToPage(product, 12, buttons, productSection);
};

getProduct(productId);
