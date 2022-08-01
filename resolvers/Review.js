const User = require('../models/userModel');
const Disc = require('../models/discModel');

exports.Review = {
    user: async({ user }, args, context) => {
        return await User.findById(user)
    },
    disc: async({ disc }, args, context) => {
        return await Disc.findById(disc)
    }
}
