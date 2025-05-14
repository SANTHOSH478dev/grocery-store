// Initializing Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Add Products to Cart
function addToCart(productName, price, button) {
  const quantity = button.previousElementSibling.value;
  const total = price * quantity;

  const existingProductIndex = cart.findIndex(
    (item) => item.name === productName
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += parseInt(quantity);
    cart[existingProductIndex].total += total;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: parseInt(quantity),
      total: total,
    });
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${productName} added to cart!`);
}

// Function to Display Cart Items
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  let total = 0;
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.style.display = "none";
  } else {
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
        <p>${item.name} (x${item.quantity})</p>
        <p>$${item.total.toFixed(2)}</p>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;

      cartItemsContainer.appendChild(cartItemDiv);
      total += item.total;
    });

    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
    cartSummary.style.display = "block";
  }
}

// Function to Remove Items from Cart
function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Call displayCart to show cart items on page load
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
