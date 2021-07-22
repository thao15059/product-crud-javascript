const productSection = document.querySelector("#product");
const productId = getIdFromQuery();

const deleteProduct = async (productId) => {
  await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });
};

const showProduct = async (product) => {
  const buttons = `
  <a href="/edit.html?id=${product.id}" class="btn btn-success">Edit</a>
  <button class="btn btn-danger" id="deleteBtn">Delete</button>
  `;
  addProductToPage(product, 12, buttons, productSection);

  const deleteBtn = document.querySelector("#deleteBtn");

  deleteBtn.addEventListener("click", async () => {
    await deleteProduct(productId);

    window.location = "/";
  });
};

getProduct(productId).then(showProduct);
