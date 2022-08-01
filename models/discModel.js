const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A disc name is required'],
        trim: true,
        maxLength: [100, 'A disc name can have up to only 40 characters'],
    },
    manufacture: {
        type: String,
        required: [true, 'A manufacture is required']
    },
    category: {
        type: String,
        required: [true, 'A category is required']
    },
    plasticType: String,
    speed: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [0, 'Speed must be above 0'],
        max: [16, 'Speed must be below 16']
    },
    glide: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [0, 'Glide must be above 0'],
        max: [7, 'Glide must be below 7']
    },
    turn: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [-4, 'Turn must be above -4'],
        max: [4, 'Turn must be below 4']
    },
    fade: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [0, 'Fade must be above 0'],
        max: [5, 'Fade must be below 5']
    },
    price: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [0, 'Price must be above 0'],
        max: [10000, 'Price must be below 10000']
    },
    quantity: {
        type: Number,
        required: [true, 'A disc speed is required'],
        min: [0, 'Quantity must be above 0'],
        max: [1000, 'Quantity must be below 1000']
    },
    image: {
        type: String,
        default: 'disc-default.jpg'
    },
});

module.exports = mongoose.model('Discs', discSchema);