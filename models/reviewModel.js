const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    disc: {
        type: mongoose.Schema.ObjectId,
        ref: 'Disc'
    },
    title: {
        type: String,
        required: [true, 'A review title is required'],
        trim: true,
        maxLength: [40, 'A review title can have up to only 40 characters'],
    },
    comment: {
        type: String,  
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    rating: {
        type: Number,
        required: [true, 'A rating is required']
    }
});

module.exports = mongoose.model('Review', reviewSchema);