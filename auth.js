
// auth.js
(function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to access this page.");
    window.location.href = "../index.html";
  }
})();
