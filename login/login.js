// login.js
const loginBtn = document.querySelector(".btn");

loginBtn.addEventListener("click", function () {
  const email = document.querySelector("input[type='email']").value.trim();
  const password = document.querySelector("input[type='password']").value;

  // Validation
  if (!email) {
    alert("Email is required!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }

  if (!password) {
    alert("Password is required!");
    return;
  }

  if (password.length < 4) {
    alert("Password must be at least 4 characters long!");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found. Please signup first.");
    return;
  }

  if (user.email === email && user.password === password) {
    // Generate a simple token
    const token = Math.random().toString(36).substr(2);
    localStorage.setItem("token", token);

    alert("Login successful!");
    window.location.href = "../shop/shop.html"; // Redirect to shop
  } else {
    alert("Invalid credentials!");
  }
});
