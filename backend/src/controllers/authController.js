const generateToken = require("../../utils/generateToken");
const hashPassword = require("../../utils/password");
const sendEmail = require("../../utils/sendMail");
const User = require("../models/user")
const bcrypt = require("bcryptjs")


exports.sendOtp = async(req, res) =>{
    try {
        const {password} = req.body
        const user = await User.findOne({username: "violentUjjwal"})
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const encrypt = await hashPassword(otp)
        if (!encrypt) return res.status(500).json({message: "OTP not encrypted"});
        user.otp = encrypt
        user.otpExpire = Date.now() + 10 * 60 * 1000;
        await user.save()
        const isSendOtp = await sendEmail(process.env.EMAIL_USER, "Login Otp", `<h1>${otp}</h1>`)
        if(!isSendOtp){
            return res.status(500).json({message: "Otp not send"});
        }
        return res.status(200).json({message: "OTP sended!"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error in sendotp"})
    }
}

exports.verifyOtp = async(req, res)=>{
    try {
        const {otp} = req.body
        const user = await User.findOne({username: "violentUjjwal"})
        if(!user.otp || !user.otpExpire) return res.status(400).json({ message: 'OTP not set.' });
        const nowDateTime = Date.now()
        if(user.otpExpire < nowDateTime) return res.status(400).json({ message: "OTP Expire."});
        console.log(otp, user.otp)
        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Otp is incorrect' });
        }
        user.otp = null
        user.otpExpire = null
        await user.save()
        user.password = "*****"

        const token = await generateToken({id: user._id})
        const expirationTime = 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            maxAge: expirationTime,
            httpOnly: true,
            secure: true
        })

        return res.status(200).json({data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "error in login"})
    }
}

exports.logout = async (req, res)=>{
    try {
        if(!req.cookies.token) return res.status(400).json({message: "you are not login"});
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
        })
        return res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}
