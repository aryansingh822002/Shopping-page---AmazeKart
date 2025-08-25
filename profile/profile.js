// profile.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.querySelector(".profile-form input[placeholder='First Name']").value = user.firstName;
    document.querySelector(".profile-form input[placeholder='Last Name']").value = user.lastName;
  }

  // Save info
  document.querySelector(".profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    user.firstName = document.querySelector(".profile-form input[placeholder='First Name']").value;
    user.lastName = document.querySelector(".profile-form input[placeholder='Last Name']").value;

    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated!");
  });

  // Change password
  document.querySelector(".password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const oldPass = document.querySelector(".password-form input[placeholder='Old Password']").value;
    const newPass = document.querySelector(".password-form input[placeholder='New Password']").value;
    const confirmNewPass = document.querySelector(".password-form input[placeholder='Confirm New Password']").value;

    if (oldPass !== user.password) {
      alert("Old password is incorrect!");
      return;
    }
    if (newPass !== confirmNewPass) {
      alert("New passwords do not match!");
      return;
    }

    user.password = newPass;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Password updated!");
  });

  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "../index.html";
  });
});
