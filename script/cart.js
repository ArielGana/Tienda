// cartDisplay.js

// Función para formatear el precio con puntos como separadores de miles
function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
}

// Función para cargar los productos del carrito desde sessionStorage
function loadCartItems() {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>No hay productos en el carrito.</li>";
    document.getElementById("cart-total").innerHTML = ""; // Limpiar total si no hay productos
    return;
  }

  let total = 0;

  cartItems.forEach((item) => {
    // Asegúrate de que el precio sea un número
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Elimina cualquier carácter no numérico

    const itemTotal = price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
        <div class="item-info">
          <img src="${item.image}" alt="${item.name}" width="50">
          <strong>${item.name}</strong> 
          <span>${formatPrice(price)}</span>
        </div>
        <span class="item-quantity">x${item.quantity}</span>
        <button onclick="removeFromCart('${item.name}')">Quitar</button>
      `;
    cartList.appendChild(li);
  });

  // Mostrar el total en el contenedor
  document.getElementById("cart-total").innerHTML = `Total: ${formatPrice(
    total
  )}`;

  // Retorna el total para usarlo más adelante
  return total;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  const productIndex = cartItems.findIndex((item) => item.name === productName);

  if (productIndex !== -1) {
    // Reducir la cantidad o eliminar si es 1
    if (cartItems[productIndex].quantity > 1) {
      cartItems[productIndex].quantity--;
    } else {
      cartItems.splice(productIndex, 1);
    }
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems();
  updateCartCount();
}

// Función para actualizar el número de productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  const total = loadCartItems();

  // Agregar evento al botón de "Comprar"
  const comprarButton = document.querySelector(".checkOut button");
  if (comprarButton) {
    comprarButton.addEventListener("click", function () {
      // Guardar el total en localStorage
      localStorage.setItem("cartTotal", total);
      // Redirigir a la página de checkout
      window.location.href = "checkOut.html";
    });
  }
});
