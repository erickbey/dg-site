const JWT = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config({ path: "./../config.env" });

exports.getUserFromToken = (token) => {
    try {
        const userId =  JWT.verify(token, process.env.JWT_SECRET)
        return userId
    } catch (error) {
        return null
    }
}