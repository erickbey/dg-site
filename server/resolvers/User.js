const Disc = require('../models/discModel');

exports.User = {
    wishlist: async({ wishlist }, args, context) => {
        return await Disc.findById(wishlist)
    },
    reviews: async({ reviews }, args, context) => {
        return await Disc.findById(reviews)
    },
    orders: async({ orders }, args, context) => {
        return await Disc.findById(orders)
    }
}