const mongoose = require('../../common/database')();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'customer', 'admin'],
        default: 'customer'
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("User", userSchema, "users");
module.exports = userModel;
