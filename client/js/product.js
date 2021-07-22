const productSection = document.querySelector("#product");
const productId = getIdFromQuery();

const showProduct = async (product) => {
  const buttons = `<a href="/edit.html?id=${product.id}" class="btn btn-success">Edit</a>`;
  addProductToPage(product, 12, buttons, productSection);
};

getProduct(productId).then(showProduct);
