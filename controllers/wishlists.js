const Wishlist = require("../models/wishlist")
const Listing = require("../models/listings.js");
const User = require("../models/user.js")

module.exports.createWishlist = async(req,res)=>{
    let { name, listingId } = req.body;
    let listing = await Listing.findById(listingId);
    let newWishlist = await Wishlist.findOne({owner : req.user._id});

    if(!newWishlist){
        newWishlist = new Wishlist({
        owner : req.user._id,
        wishlists:[{
            name,
            listings : [listing._id]
        }]
    });
        await newWishlist.save();
        req.flash("success", "New Wishlist Created!");
        return res.redirect("/listings");
    }
    
    let existingWishlist = null;
    for(let wishlist of newWishlist.wishlists){
        if(wishlist.name === name){
            existingWishlist = wishlist;
            break;
        }
    }

    if(existingWishlist){
        let alreadyExists = existingWishlist.listings.some(
            id => id.equals(listing._id)
        );
        if (!alreadyExists) {
            existingWishlist.listings.push(listing._id);
            req.flash("success", "Added to existing wishlist!");
        }else {
            req.flash("error", "Listing already exists in this wishlist!");
        }
    }else{
        newWishlist.wishlists.push({
            name,
            listings : [listing._id]
        })
    }

    await newWishlist.save();
    req.flash("success","New Wishlist Created!");
    return res.redirect("/listings");
}

module.exports.index =( async (req,res)=>{
    const allWishlist = await Wishlist.find({owner: req.user._id})
        .populate("wishlists.listings");
    res.render("wishlist/index.ejs", { allWishlist });
})

module.exports.showWishlists = (async (req,res)=>{
    let { wishlistId } = req.params;
    const userWishlist = await Wishlist.findOne({owner:req.user._id})
        .populate("wishlists.listings");

    const wishlist = userWishlist.wishlists.id(wishlistId)
    res.render("wishlist/show.ejs",{ wishlist });
});

module.exports.addToWishlist = (async (req,res)=>{
    const { wishlistId, listingId } = req.body;
    const userWishlist = await Wishlist.findOne({owner : req.user._id});

    if(!userWishlist){
        req.flash("error","Wishlist not Found!");
        return res.redirect("/listings");
    }
    const wishlist = userWishlist.wishlists.id(wishlistId);

    if(!wishlist){
        req.flash("error","Wishlist not Found!");
        return res.redirect("/listings");
    }
    const alreadyExists = wishlist.listings.some(id => id.equals(listingId));

    if(alreadyExists){
        req.flash("error","Listing already exists in the wishlist!");
    }else{
        wishlist.listings.push(listingId);
        await userWishlist.save();
        req.flash("success","Listing Added to Wishlist!");
    }
    res.redirect("/listings");

});

module.exports.destroyWishlist = (async (req,res)=>{
    let { wishlistId } = req.params;
    
    await Wishlist.updateOne(
        {owner : req.user._id},
        {
            $pull : {
                wishlists : {_id : wishlistId}
            }
        }
    );
    req.flash("success","Wishlist Deleted!");
    res.redirect("/wishlist");
})