// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Cart Items
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const checkoutList = document.getElementById("checkoutList");
  const totalPriceEl = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  checkoutList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    // Create cart item card
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Price : $${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;

    // Add to checkout list
    checkoutList.innerHTML += `
      <li>
        <span>${item.title}</span>
        <span>$${item.price}</span>
      </li>
    `;
  });

  totalPriceEl.innerText = "$" + total;
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Razorpay Checkout
document.getElementById("checkoutBtn").addEventListener("click", (e) => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // calculate total
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  var options = {
    key: "rzp_test_R9X4MUoYKUuAYt", // 🔑 replace with test key from Razorpay Dashboard
    amount: total * 100, // amount in paise (₹1 = 100 paise)
    currency: "INR",
    name: "AmazeKart Checkout",
    description: "Order Payment",
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    theme: {
      color: "#000",
    },
    handler: function (response) {
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      // clear cart
      cart = [];
      localStorage.removeItem("cart");
      renderCart();
    },
    modal: {
      ondismiss: function () {
        alert("Payment Cancelled!");
      },
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
});

// Initial render
renderCart();
