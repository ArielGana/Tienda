// cart.js

// Función para actualizar el número de productos en el carrito
function updateCartCount() {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  document.getElementById("cart-count").innerText = cartCount;
}

// Función para añadir un producto al carrito
function addToCart(product) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  // Comprobar si el producto ya está en el carrito
  const existingProduct = cartItems.find((item) => item.name === product.name);

  if (existingProduct) {
    // Incrementar la cantidad si ya existe
    existingProduct.quantity++;
  } else {
    // Si no existe, añadir el producto con cantidad 1
    product.quantity = 1;
    cartItems.push(product);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  // Filtrar los productos para eliminar el seleccionado
  cartItems = cartItems.filter((item) => item.name !== productName);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems();
  updateCartCount();
}

// Escuchar los clicks en los botones "Añadir al carrito"
document.querySelectorAll(".cart button").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button
      .closest(".product-item")
      .querySelector("h3").innerText;
    const productPrice = button
      .closest(".product-item")
      .querySelector("strong").innerText;
    const productImage = button
      .closest(".product-item")
      .querySelector("img").src;

    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    addToCart(product);
  });
});

// Actualizar el número de productos al cargar la página
document.addEventListener("DOMContentLoaded", updateCartCount);
