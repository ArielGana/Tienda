document.addEventListener("DOMContentLoaded", function () {
  const envioMethod = document.getElementById("envio-method");
  const addressFields = document.getElementById("address-fields");
  const direccion = document.getElementById("direcc");
  const checkoutTotalElement = document.getElementById("checkout-total");
  const paymentForm = document.getElementById("payment-form");
  const paymentModal = document.getElementById("payment-modal");
  const closeModal = document.getElementById("close-modal");

  // Función para formatear el precio con puntos como separadores de miles
  function formatPrice(price) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Función para mostrar el total desde localStorage
  function displayTotal() {
    const total = localStorage.getItem("cartTotal");
    if (total) {
      checkoutTotalElement.innerHTML = `Total a pagar: ${formatPrice(total)}`;
    } else {
      checkoutTotalElement.innerHTML =
        "No se encontró un total para el carrito.";
    }
  }

  // Función para mostrar u ocultar campos de dirección
  function toggleAddressFields() {
    if (envioMethod.value === "local") {
      addressFields.style.display = "none"; // Oculta los campos de dirección
      direccion.style.display = "block"; // Muestra solo la dirección local
    } else {
      addressFields.style.display = "block"; // Muestra los campos de dirección
      direccion.style.display = "none";
    }
  }

  // Escuchar el evento de cambio en el select de método de envío
  envioMethod.addEventListener("change", toggleAddressFields);

  // Llamar a la función al cargar la página para ocultar o mostrar campos según el valor seleccionado
  toggleAddressFields();

  // Mostrar el total en la página de checkout al cargar
  displayTotal();

  // Mostrar el modal cuando se presiona "Completar Pago"
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se envíe el formulario de inmediato

    // Mostrar el modal
    paymentModal.style.display = "block";

    // Simular un retraso antes de redirigir al método de pago
    setTimeout(function () {
      // Borrar los productos del carrito en localStorage
      localStorage.removeItem("cartItems"); // Si tienes otros datos del carrito, elimina también esas claves
      sessionStorage.removeItem("cartItems");
      // Redirigir al método de pago real
      window.location.href = "index.html"; // Cambia por tu URL de pago
    }, 2000);
  });

  // Cerrar el modal al presionar el botón de cerrar (opcional)
  closeModal.addEventListener("click", function () {
    paymentModal.style.display = "none";
  });
});
