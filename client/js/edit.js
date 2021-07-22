const productEditForm = document.querySelector("#productEditForm");
const errorMessage = document.querySelector("#errorMessage");
const productId = getIdFromQuery();

errorMessage.style.display = "none";

const populateFormWithProduct = (product) => {
  document.querySelector("#title").value = product.title;
  document.querySelector("#description").value = product.description;
  document.querySelector("#image").value = product.image;
  document.querySelector("#price").value = product.price;
  document.querySelector("#quantity").value = product.quantity;
};

const updateProduct = async ({
  productId,
  title,
  description,
  price,
  quantity,
  image,
}) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, description, price, quantity, image }),
  });

  const { id } = await response.json();

  window.location = `/product.html?id=${id}`;
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  errorMessage.style.display = "none";

  const productFormData = new FormData(productEditForm);
  const title = productFormData.get("title");
  const description = productFormData.get("description");
  const image = productFormData.get("image");
  const price = Number(productFormData.get("price"));
  const quantity = Number(productFormData.get("quantity"));

  if (!title.trim()) {
    errorMessage.textContent = "Title is required";
    errorMessage.style.display = "block";
    return;
  }

  if (isNaN(price) || price <= 0) {
    errorMessage.textContent = "Price must be greater than $0";
    errorMessage.style.display = "block";
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    errorMessage.textContent = "Quantity must be a positive whole number";
    errorMessage.style.display = "block";
    return;
  }

  updateProduct({
    productId,
    title,
    description,
    price,
    quantity,
    image,
  });
};

productEditForm.addEventListener("submit", handleFormSubmit);

getProduct(productId).then(populateFormWithProduct);
