const Disc = require('../models/discModel');
const Review = require('../models/reviewModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const validator = require('validator');
const bcrypt = require('bcrypt');
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

        if(!name || !userName) {
            return {
                userErrors: [{ message: 'Please provide a name and username'}],
                token: null
            };
        };

        const isEmail = validator.isEmail(email);
        if(!isEmail) {
            return {
                userErrors: [{ message: 'Please provide a valid email'}],
                token: null
            };
        };

        const isValidPassword = validator.isLength(password, {
            min:7
        });

        if(!isValidPassword) {
            return {
                userErrors: [{ message: 'Please provide a valid password (Must be at least 8 characters)'}],
                token: null
            };
        };

        if(password !== passwordConfirm) {
            return {
                userErrors: [{ message: 'Passwords do not match'}],
                token: null
            };
        };

        hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            userName,
            email,
            password: hashedPassword,
            passwordConfirm: hashedPassword
        })

        await newUser.save();

        const token = JWT.sign({ newUserId: newUser._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

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
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return {
                userErrors: [{ message: "Invalid credentials" }],
                token: null,
            };
        };

        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

        return {
            userErrors: [],
            token
        };
    },
    addReview: async(parent, { input }, context) => {     
        const {user, disc, date, title, comment, rating} = input;
        
        if(!user) {
            return {
                userErrors: [{ message: "You must be logged in to leave a review" }],
                status: "Failed",
            };
        };

        const newReview = new Review({
            user,
            disc,
            title, 
            comment, 
            rating        
        });

        await newReview.save();

        await User.findByIdAndUpdate(context.userId, {
            $push: {reviews: newReview.id},
            safe: true, upsert: true, new : true,
        });

        return {
            userErrors: [],
            status: "Success",
        };
    },
    addOrder: async(parent, { input }, context) => {
        const currentUser = await User.findByIdAndUpdate(context.userId);

        if(!currentUser) {
            return {
                userErrors: [{ message: "You must be logged in to make an order" }],
                status: "Failed",
            };
        };

        const { items } = input;

        if (!items.length) {
            return {
                userErrors: [{ message: "You have no items in your cart" }],
                status: "Failed",
            };
        }

        const newOrder = new Order({
            user: currentUser,
            items
        });

        await newOrder.save();

        await User.findByIdAndUpdate(context.userId, {
            $push: {orders: newOrder.id},
            safe: true, upsert: true, new : true,
        });

        return {
            userErrors: [],
            status: "Success",
        };
    },
    deleteReview: async(parent, { input }, context) => {
        const currentUser = await User.findByIdAndUpdate(context.userId);
        const { id } = input;
        
        if(!id) {
            return {
                userErrors: [{ message: "An error occured while deleting your review" }],
                status: "failed",
            };
        }

        if(!currentUser) {
            return {
                userErrors: [{ message: "You must be logged in to make an review" }],
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
        const id = input;
        const currentUser = await User.findByIdAndUpdate(context.userId);

        if(!id) {
            return {
                userErrors: [{ message: "An error occured while adding item to your wishlist" }],
                status: "failed",
            };
        };

        if(!context.userId) {
            return {
                userErrors: [{ message: "You must be logged in to make an order" }],
                status: "failed",
            };
        }

        if(currentUser.wishlist.includes(id)) {
            return {
                userErrors: [{ message: "This item is already in your wishlist" }],
                status: "failed",
            };
        }
        
        await User.findByIdAndUpdate(context.userId, {
            $push: {wishlist: id},
            safe: true, upsert: true, new : true,
        })

        return {
            userErrors: [],
            status: "Success",
        };
    },
    deleteFromWishlist: async(parent, { input }, context) => {
        if(!input) {
            return {
                userErrors: [{ message: "An error occured while removing the item from your wishlist" }],
                status: "failed",
            };
        }

        if(!context.userId) {
            return {
                userErrors: [{ message: "You must be logged in to add to your wishlist" }],
                status: "failed",
            };
        }

        await User.findByIdAndUpdate(context.userId, {
            $pull: {wishlist: input},
        })

        return {
            userErrors: [],
            status: "Success",
        };
    },
    updateUser : async(parent, { input }, context) => {
        let { name, userName, email } = input;

        if(!context.userId) {
            return {
                userErrors: [{ message: "You must be logged in to make changes to user info" }],
                status: "failed",
            };
        }

        if(!name) name = undefined;
        if(!userName) userName = undefined;
        if(!email) email = undefined;
        
        await User.findByIdAndUpdate(context.userId, {name, userName, email}, {
            upsert: true,
            new: true,
        })

        return {
            userErrors: [],
            status: "Success",
        };
    },
    changePassword : async(parent, { input }, context) => {
        const { currentPassword, password, passwordConfirm } = input;
        const user = await User.findById(context.userId).select('+password');

        if(!context.userId) {
            return {
                userErrors: [{ message: "You must be logged in to change a users password" }],
                status: "failed",
            };
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
        return {
                userErrors: [{ message: "Invalid credentials" }],
                status: "Failed"
            };
        };

        const isValidPassword = validator.isLength(password, {
            min:7
        });

        if(!isValidPassword) {
            return {
                userErrors: [{ message: 'Please provide a valid password (Must be at least 8 characters)'}],
                status: "Failed"
            };
        };

        if(password !== passwordConfirm) {
            return {
                userErrors: [{ message: 'Passwords do not match'}],
                status: "Failed"
            };
        };

        hashedPassword = await bcrypt.hash(password, 12);
        
        await User.findByIdAndUpdate(context.userId, {
            password: hashedPassword,
            passwordConfirm: hashedPassword,
            new : true,
        })

        return {
            userErrors: [],
            status: "Success",
        };
    },
}