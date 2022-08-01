const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    items: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Disc',
    }],
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Order', orderSchema);