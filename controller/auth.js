const dbuser = require("../model/users")

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await dbuser.create({
            username,
            email,
            password
        })
        res.status(201).json({
            success: true,
            user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const login = (req, res, next) => {
    res.send("login route")
}

const forgetPassword = (req, res, next) => {
    res.send("forgetPassword route")
}

const resetPassword = (req, res, next) => {
    res.send("resetPassword route")
}


module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword
}