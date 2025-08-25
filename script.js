// index.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    document.querySelector(".nav-items a[href='../login/login.html']").style.display = "none";
    document.querySelector(".nav-items a[href='../signup/signup.html']").style.display = "none";
  }
});
