const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

const user = mongoose.model("user", userSchema);

module.exports = user;