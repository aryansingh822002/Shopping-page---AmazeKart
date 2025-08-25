const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");

// aside filters
const priceFilters = document.querySelectorAll("input[name='prange']");
const colorFilters = document.querySelectorAll("input[name='color']");
const sizeFilters = document.querySelectorAll("input[name='size']");
const ratingFilter = document.getElementById("range");

const filterToggle = document.getElementById("filterToggle");
const aside = document.querySelector("aside");

let products = [];
let filteredProducts = [];

filterToggle.addEventListener("click", () => {
  aside.classList.toggle("active");
});

// Close sidebar when filter is applied
document.querySelectorAll("aside input, aside .filter").forEach(el => {
  el.addEventListener("change", () => {
    if (window.innerWidth <= 768) {
      aside.classList.remove("active");
    }
  });
});



// Fetch products
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
    filteredProducts = products; // initial
    renderProducts(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render products
function renderProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">S, M, L</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background-color: red"></div>
            <div class="circle" style="background-color: blue"></div>
            <div class="circle" style="background-color: green"></div>
          </div>
        </div>
        <div class="row">Rating: ${product.rating.rate} ⭐</div>
      </div>
      <button class="addBtn">Add to Cart</button>
    `;

    const addBtn = item.querySelector(".addBtn");
    addBtn.addEventListener("click", () => addToCart(product));

    productsContainer.appendChild(item);
  });
}

// Save to cart (localStorage)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}


// ✅ Combined filtering function
function applyFilters() {
  const query = searchInput.value.toLowerCase();

  // collect selected filters
  const selectedCategory = document.querySelector(".filter.active").dataset.category;
  const selectedPrices = Array.from(priceFilters).filter(cb => cb.checked).map(cb => cb.id);
  const selectedColors = Array.from(colorFilters).filter(cb => cb.checked).map(cb => cb.id);
  const selectedSizes = Array.from(sizeFilters).filter(cb => cb.checked).map(cb => cb.id.toUpperCase());
  const minRating = parseFloat(ratingFilter.value);

  filteredProducts = products.filter((p) => {
    // search
    if (!p.title.toLowerCase().includes(query)) return false;

    // category
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

    // price
    if (selectedPrices.length > 0) {
      let inPrice = selectedPrices.some((range) => {
        if (range === "0-25") return p.price >= 0 && p.price <= 25;
        if (range === "25-50") return p.price > 25 && p.price <= 50;
        if (range === "50-100") return p.price > 50 && p.price <= 100;
        if (range === "100on") return p.price > 100;
      });
      if (!inPrice) return false;
    }

    // color (⚠️ fake, since API has no colors — you can map categories to colors or skip)
    if (selectedColors.length > 0) {
      // Example mapping: just allow everything for now
      // You can customize by category/title keywords
      let hasColor = selectedColors.some(c => p.title.toLowerCase().includes(c));
      if (!hasColor) return false;
    }

    // size (⚠️ also fake, since API has no sizes — we assume S,M,L available always)
    if (selectedSizes.length > 0) {
      // for demo: all products have S,M,L — XL not available
      let availableSizes = ["S","M","L"];
      let match = selectedSizes.some(s => availableSizes.includes(s));
      if (!match) return false;
    }

    // rating
    if (p.rating.rate < minRating) return false;

    return true;
  });

  renderProducts(filteredProducts);
}

// Search filter
searchInput.addEventListener("input", applyFilters);

// Category filter
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    applyFilters();
  });
});

// Price filter
priceFilters.forEach(cb => cb.addEventListener("change", applyFilters));

// Color filter
colorFilters.forEach(cb => cb.addEventListener("change", applyFilters));

// Size filter
sizeFilters.forEach(cb => cb.addEventListener("change", applyFilters));

// Rating filter
ratingFilter.addEventListener("input", applyFilters);

// Init
fetchProducts();
