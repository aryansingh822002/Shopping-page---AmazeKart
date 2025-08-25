// signup.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validation
  const nameRegex = /^[A-Za-z]+$/;
  if (!firstName || !nameRegex.test(firstName)) {
    alert("Please enter a valid first name (letters only).");
    return;
  }
  if (!lastName || !nameRegex.test(lastName)) {
    alert("Please enter a valid last name (letters only).");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    alert("Email is required.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Check if email already exists
  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.email === email) {
    alert("This email is already registered. Please login instead.");
    return;
  }

  // Password validation
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must contain at least one letter and one number.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Save user in localStorage
  const user = { firstName, lastName, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful! Please login now.");

  window.location.href = "../login/login.html";
});
