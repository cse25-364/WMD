// Load saved cart or create empty one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load cart when page opens
window.onload = loadCart;

// Function to display cart
function loadCart() {

  let container = document.getElementById("cart-container");
  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {

    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="60">

        <div>
          <h4>${item.name}</h4>
          <p>P${item.price}</p>

          <!-- Quantity input -->
          <input type="number" value="${item.qty}" min="1"
            onchange="updateQty(${index}, this.value)">
        </div>

        <div>P${itemTotal}</div>

        <!-- Remove button -->
        <button onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  let vat = subtotal * 0.10;
  let total = subtotal + vat;

  document.getElementById("subtotal").textContent = "P" + subtotal;
  document.getElementById("vat").textContent = "P" + vat.toFixed(2);
  document.getElementById("total").textContent = "P" + total.toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update quantity
function updateQty(index, qty) {
  cart[index].qty = parseInt(qty);
  loadCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  loadCart();
}
