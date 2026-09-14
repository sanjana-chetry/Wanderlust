(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Wishlist Icon
let heartIcon = document.querySelectorAll(".heart-icon");
let selectedListingId = "";

heartIcon.forEach((heart=>{
  heart.addEventListener("click",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    // If already liked, just unlike it
    if (heart.classList.contains("liked")) {
      heart.classList.remove("liked");
    } else {
      // Heart is empty, so show the popup
      const listingInput = document.getElementById("listingId");

      if (listingInput) {
        listingInput.value = heart.dataset.id;
      }
      selectedListingId = heart.dataset.id;
      const modal = new bootstrap.Modal(document.getElementById("wishlistModal"));
      modal.show();

      // For demo, mark it as liked immediately
      heart.classList.add("liked");
    }
  })
}));

//wishlist form
let create_btn = document.querySelector(".create-new");
let existing_list = document.getElementById("wishlistOptions");
let create_form = document.querySelector(".createWishlist-form");

if(create_btn){
  create_btn.addEventListener("click",()=>{
    existing_list.style.display = "none";
    create_form.style.display = "block"
  });
}

// existing wishlists

let existingWishlist = document.querySelectorAll(".existing-wishlists");

existingWishlist.forEach((wishlist)=>{
  wishlist.addEventListener("click",()=>{
    document.getElementById("wishlistId").value = wishlist.dataset.id;
    document.getElementById("existingListingId").value = selectedListingId;
    document.getElementById("existingWishlistForm").submit();
  })
});

// Password Toggle
let togglePassword = document.getElementById("password-toggle");
let password = document.getElementById("password");

console.log(togglePassword);
console.log(password);
if(password && togglePassword){
  togglePassword.addEventListener("click",()=>{
    if(password.type === "password"){
      password.type = "text";

      togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }else{
      password.type = "password";

      togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    }
 });
}



// SEARCH & FILTER
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

const searchPanel = document.getElementById("searchPanel");

const priceOption = document.getElementById("priceOption");
const locationOption = document.getElementById("locationOption");

const pricePanel = document.getElementById("pricePanel");
const locationPanel = document.getElementById("locationPanel");

const backFromPrice = document.getElementById("backFromPrice");
const backFromLocation = document.getElementById("backFromLocation");

const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");

const locationInput = document.getElementById("locationInput");
const locationSuggestions = document.getElementById("locationSuggestions");

const applyPrice = document.getElementById("applyPrice");
const applyLocation = document.getElementById("applyLocation");

const selectedFilters = document.getElementById("selectedFilters");

// REPOSITION THE PANEL SO IT NEVER OVERLAPS THE CHIP ROW
function repositionPanel() {
    const baseTop = searchBox.offsetHeight + 10; // gap below search box
    const chipsVisible = selectedFilters.style.display === "flex";
    const extra = chipsVisible ? selectedFilters.offsetHeight + 10 : 0;
    searchPanel.style.top = (baseTop + extra) + "px";
}

// OPEN SEARCH PANEL
searchInput.addEventListener("focus", () => {
    repositionPanel();
    searchPanel.style.display = "block";
});

// PRICE
priceOption.addEventListener("click", () => {
    document.querySelector(".search-options").style.display = "none";
    document.querySelector(".search-panel > h6").style.display = "none";

    pricePanel.style.display = "block";
});

// APPLY PRICE
applyPrice.addEventListener("click", () => {
    updateFilters();
    pricePanel.style.display = "none";
    document.querySelector(".search-panel > h6").style.display = "block";
    document.querySelector(".search-options").style.display = "flex";
});

// BACK FROM PRICE
backFromPrice.addEventListener("click", () => {
    pricePanel.style.display = "none";
    document.querySelector(".search-panel > h6").style.display = "block";
    document.querySelector(".search-options").style.display = "flex";
});

// LOCATION
locationOption.addEventListener("click", () => {
    document.querySelector(".search-options").style.display = "none";
    document.querySelector(".search-panel > h6").style.display = "none";
    locationPanel.style.display = "block";
    locationInput.focus();
    getLocations(locationInput.value);
});

// GET LOCATIONS
async function getLocations(search) {
    try {

        const response = await fetch(
            `/listings/suggestions?location=${encodeURIComponent(search)}`
        );
        const locations = await response.json();
        locationSuggestions.innerHTML = "";
        locations.forEach(location => {
            const div = document.createElement("div");
            div.classList.add("location-suggestion");
            div.innerHTML = `
                <i class="fa-solid fa-location-dot"></i>
                <span>${location}</span>
            `;
            div.addEventListener("click", () => {
                locationInput.value = location;
            });
            locationSuggestions.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching locations:", error);

    }
}

// LOCATION SEARCH
locationInput.addEventListener("input", () => {
    getLocations(locationInput.value);
});

// APPLY LOCATION
applyLocation.addEventListener("click", () => {
    updateFilters();
    locationPanel.style.display = "none";

    document.querySelector(".search-panel > h6").style.display = "block";
    document.querySelector(".search-options").style.display = "flex";
});

// BACK FROM LOCATION
backFromLocation.addEventListener("click", () => {
    locationPanel.style.display = "none";

    document.querySelector(".search-panel > h6").style.display = "block";
    document.querySelector(".search-options").style.display = "flex";
});

// SHOW FILTER CHIPS
function updateFilters() {
    selectedFilters.innerHTML = "";

    const minPrice = minPriceInput.value.trim();
    const maxPrice = maxPriceInput.value.trim();
    const location = locationInput.value.trim();

    // PRICE CHIP
    if (minPrice || maxPrice) {
        const priceChip = document.createElement("div");
        priceChip.classList.add("filter-chip");
        priceChip.innerHTML = `
            <span>
                ₹${minPrice || "0"} - ₹${maxPrice || "∞"}
            </span>
            <button type="button">×</button>
        `;
        priceChip.querySelector("button").addEventListener("click", () => {
            minPriceInput.value = "";
            maxPriceInput.value = "";
            updateFilters();
        });
        selectedFilters.appendChild(priceChip);
    }
    // LOCATION CHIP
    if (location) {
        const locationChip = document.createElement("div");
        locationChip.classList.add("filter-chip");
        locationChip.innerHTML = `
            <span>
                <i class="fa-solid fa-location-dot"></i>
                ${location}
            </span>
            <button type="button">×</button>
        `;
        locationChip.querySelector("button").addEventListener("click", () => {
            locationInput.value = "";
            updateFilters();
        });
        selectedFilters.appendChild(locationChip);
    }
    // SHOW/HIDE THE CONTAINER BASED ON WHETHER ANY CHIPS EXIST
    if (selectedFilters.children.length > 0) {
        selectedFilters.style.display = "flex";
    } else {
        selectedFilters.style.display = "none";
    }
    // KEEP THE DROPDOWN PANEL CLEAR OF THE CHIP ROW
    repositionPanel();
}
// SEARCH BUTTON
searchButton.addEventListener("click", () => {

    const search = searchInput.value.trim();
    const minPrice = minPriceInput.value.trim();
    const maxPrice = maxPriceInput.value.trim();
    const location = locationInput.value.trim();
    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }
    if (minPrice) {
        params.append("minPrice", minPrice);
    }
    if (maxPrice) {
        params.append("maxPrice", maxPrice);
    }
    if (location) {
        params.append("location", location);
    }
    window.location.href = `/listings?${params.toString()}`;
});
// CLOSE SEARCH PANEL
document.addEventListener("click", (event) => {
    const searchContainer =
        document.querySelector(".search-container");
    if (!searchContainer.contains(event.target)) {
        searchPanel.style.display = "none";
    }
});