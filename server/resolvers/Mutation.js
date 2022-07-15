const Disc = require('../models/discModel');
const Review = require('../models/reviewModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const validator = require('validator');
const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server-errors');
const JWT = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config({ path: "../../config.env" });


exports.Mutation = {
    addDisc: async(parent, { input }, context) => {
        const {name, manufacture, category, plasticType, speed, glide, turn, fade, image, price, quantity} = input;

        const newDisc = new Disc({
            name,
            manufacture,
            category,
            plasticType,
            speed,
            glide,
            turn,
            fade,
            image,
            price,
            quantity
        })

        await newDisc.save();

        return {
            userErrors: [],
            status: "Success",
        };
    },
    addUser: async(parent, { input }, context) => {
        const {name, userName, email, password, passwordConfirm} = input;

        const isEmail = validator.isEmail(email);
        if(!isEmail) {
            return {
                userErrors: [{ message: 'Please provide a valid email'}],
                token: null
            };
        }

        const isValidPassword = validator.isLength(password, {
            min:7
        })

        if(!isValidPassword) {
            return {
                userErrors: [{ message: 'Please provide a valid password'}],
                token: null
            };
        }

        if(password !== passwordConfirm) {
            return {
                userErrors: [{ message: 'Passwords do not match'}],
                token: null
            };
        }

        hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            userName,
            email,
            password: hashedPassword,
            passwordConfirm: hashedPassword
        })

        await newUser.save();

        const token = JWT.sign({ newUserId: newUser._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}) 

        return {
            userErrors: [],
            token
        };
    },
    signIn: async(parent, { input }, context) => {
        const { email, password } = input;
        
        const user = await User.findOne({ email }).select('+password');

        if(!email || !password || !user) {
            return {
                userErrors: [{ message: 'Please provide a valid username and password'}],
                token: null
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return {
                userErrors: [{ message: "Invalid credentials" }],
                token: null,
            };
        }

        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        return {
            userErrors: [],
            token
        }
    },
    addReview: async(parent, { input }, context) => {     
        const {user, disc, date, title, comment, rating} = input;
        
        if(!user) {
            return {
                userErrors: [{ message: "You must be logged in to leave a review" }],
                status: "Failed",
            };
        }

        const newReview = new Review({
            user,
            disc,
            title, 
            comment, 
            rating        
        })

        await newReview.save();

        return {
            userErrors: [],
            status: "Success",
        };;
    },
    addOrder: async(parent, { input }, { id }) => {
        if(!id) {
            return {
                userErrors: [{ message: "You must be logged in to make an order" }],
                status: "Failed",
            };
        }

        const {user, items, date} = input;

        const newOrder = new Order({
            user,
            items,
            date
        })

        await newOrder.save();

        return {
            userErrors: [],
            status: "Success",
        };
    },
    deleteReview: async(parent, { input }, context) => {
        const { id } = input
        
        if(!id) {
            return {
                userErrors: [{ message: "You must be logged in to make an order" }],
                status: "failed",
            };
        }

        await Review.findByIdAndDelete(id);

        return {
            userErrors: [],
            status: "Success",
        };
    },
    addToWishlist : async(parent, { input }, context) => {
        const { discId, name, manufacture, price} = input
    }
}