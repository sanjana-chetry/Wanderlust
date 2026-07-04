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

create_btn.addEventListener("click",()=>{
  existing_list.style.display = "none";
  create_form.style.display = "block"
});

// existing wishlists

let existingWishlist = document.querySelectorAll(".existing-wishlists");

existingWishlist.forEach((wishlist)=>{
  wishlist.addEventListener("click",()=>{
    document.getElementById("wishlistId").value = wishlist.dataset.id;
    document.getElementById("existingListingId").value = selectedListingId;
    document.getElementById("existingWishlistForm").submit();
  })
})