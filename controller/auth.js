const dbuser = require("../model/users");
const ErrorResponse = require("../utils/errorResponse");

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
        // res.status(500).json({
        //     success: false,
        //     error: err.message
        // })
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // res.status(400).json({
        //     success: false,
        //     error: "please provide email and password"
        // })
        return next(new ErrorResponse("please provide email and password", 400))
    }

    try {

        const user = await dbuser.findOne({ email }).select("password");

        if (!user) {
            // res.status(404).json({
            //     success: false,
            //     error: "user not found"
            // })
            return next(new ErrorResponse("Invalid credential", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            // res.status(404).json({
            //     success: false,
            //     error: "invallid credential"
            // })
            return next(new ErrorResponse("Invalid credential", 401));
        }

        res.status(200).json({
            success: true,
            token: "kok7\8\57dco"
        })

    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     error: error.message
        // })

        next(error);
    }
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