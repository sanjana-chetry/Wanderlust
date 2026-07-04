const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },

    wishlists : [
        {
            name : String,

            listings : [{
                type : mongoose.Types.ObjectId,
                ref : "Listing"
            }]
    }
]
});

module.exports = mongoose.model("Wishlist",wishlistSchema);