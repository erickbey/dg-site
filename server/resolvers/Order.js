const User = require('../models/userModel');
const Disc = require('../models/discModel');

exports.Order = {
    user: async({ user }, args, context) => {
        return await User.findById(user) 
    },
    items: async({ items }, args, context) => {
        return await Disc.find({ '_id': items });
    }
}
