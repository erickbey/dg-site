const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required'],
        trim: true,
        maxLength: [40, 'A users name can have up to only 40 characters'],
    },
    userName: {
        type: String,
        required: [true, 'A username is required'],
        trim: true,
        maxLength: [40, 'A username can have up to only 40 characters'],
    },
    email: {
        type: String,
        required: [true, 'An email is required'],
        unique: true,
        lowercase: true,       
    },
    image: {
        type: String,
        default: 'user-default.jpg'
    },
    password: {
        type: String,
        required: true, 
        minlength: 8, 
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    wishlist: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Disc'
    },
    reviews: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Review'
    },
    orders: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Order'
    },
});

module.exports = mongoose.model('User', userSchema);