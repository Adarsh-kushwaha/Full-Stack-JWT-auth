const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"]
    },
    email: {
        type: String,
        required: [true, "please provide email"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "please provide a vallid email"]
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//generating JWT Token for signed user
userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE });
}

const user = mongoose.model("user", userSchema);

module.exports = user;