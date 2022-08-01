const Disc = require('../models/discModel');
const Review = require('../models/reviewModel');
const Order = require('../models/orderModel');

exports.User = {
    wishlist: async({ wishlist }, args, context) => {
        return await Disc.find({ _id: { $in: wishlist } })
    },
    reviews: async({ reviews }, args, context) => {
        return await Review.find({ _id: { $in: reviews } })
    },
    orders: async({ orders }, args, context) => {
        if(!orders.length) {
            return null
        }
        return await Order.find({ _id: { $in: orders } })
    }
}