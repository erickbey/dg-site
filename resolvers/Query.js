const Disc = require('../models/discModel');
const User = require('../models/userModel');
const Orders = require('../models/orderModel');
const Review = require('../models/reviewModel');


exports.Query = {
    allDiscs: async (parent, args, context) => {
        return await Disc.find({})  
    },
    disc: async (parent, args, context) => {
        return await Disc.findById(args.id)
    },
    user: async (parent, args, context) => {
        return await User.findById(context.userId)
    },
    reviews: async (parent, {filter}, args, context) => {
        return await Review.find({})
    },
    orders: async (parent, args, context) => {
        return await Orders.find({})
    }
}
