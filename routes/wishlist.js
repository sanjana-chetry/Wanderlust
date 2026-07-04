const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Wishlist = require("../models/wishlist.js");
const { isLoggedIn, validateWishlist } = require("../middleware.js");

const wishlistController = require("../controllers/wishlists.js");

//index and post route
router
    .route("/")
    .get(isLoggedIn,wrapAsync(wishlistController.index))
    .post(
        isLoggedIn,
        validateWishlist,
        wrapAsync(wishlistController.createWishlist)
    )

//show route
router
    .route("/:wishlistId")
    .get(isLoggedIn,wrapAsync(wishlistController.showWishlists))
    .delete(isLoggedIn,wrapAsync(wishlistController.destroyWishlist));

router.post("/add",isLoggedIn,wrapAsync(wishlistController.addToWishlist));


module.exports = router;