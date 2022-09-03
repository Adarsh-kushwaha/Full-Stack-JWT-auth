const dbuser = require("../model/users");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/sendMails");

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await dbuser.create({
            username,
            email,
            password
        })
        // res.status(201).json({
        //     success: true,
        //     user
        // })
        sendToken(user, 201, res);
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

        // res.status(200).json({
        //     success: true,
        //     token: "kok7\8\57dco"
        // })
        sendToken(user, 200, res);

    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     error: error.message
        // })

        next(error);
    }
}

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await dbuser.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("this user doesnt exist", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

        const message = `<h1>You have requested Password Reset</h1>
        <p>please go through this link to reset the password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendMail({
                to: user.email,
                subject: "password reset request",
                text: message
            })
            res.status(200).json({ success: true, data: "email sent" })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("email failed", 500))
        }

    } catch (error) {
        next(error);
    }
}

const resetPassword = (req, res, next) => {
    res.send("resetPassword route")
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
}


module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword
}