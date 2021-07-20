const errorMessage = document.querySelector("#errorMessage");
const productForm = document.querySelector("#productForm");

errorMessage.style.display = "none";

const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const { id } = await response.json();

  window.location = `/product.html?id=${id}`;
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  errorMessage.style.display = "none";

  const productFormData = new FormData(productForm);
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

  const productF = {
    title,
    description,
    price,
    quantity,
    image,
  };

  createProduct(productF);
};

productForm.addEventListener("submit", handleFormSubmit);
