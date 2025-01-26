import alluser from "../../Database/DbConnecting/DbModel/DbModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendMailVerification from "../../Gmail/Email/Email.js";
import Application from "../../Database/DbConnecting/DbModel/ApplicationModel.js";


const SignupController = async (req, res)=>{
    try {
        const {name, cnic, email, password} = req.body;

        if(!name || !cnic || !email || !password){
            return res.status(400).send({status: 400, message: "All inputs Required"});
        }

        const userExist = await alluser.findOne({ email })

        if(userExist){
            return res.status(400).send({status: 400, message: "user already exist"});
        }

        const encryptPass = await bcrypt.hash(password, 10);

        const newUser = await alluser.create({
            name,
            cnic,
            email,
            password : encryptPass
        })

        res.status(201).send({status: 201, message: "user registered successfully", user: newUser});

    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const LoginController = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({status: 400, message: "All inputs Required"});
        }

        const userFound = await alluser.findOne({ email });

        if(!userFound){
            return res.status(400).send({status: 400, message: "user not found...!"});
        }

        const passwrodCheck = await bcrypt.compare(password, userFound.password);

        if(!passwrodCheck){
            return res.status(400).send({status: 400, message: "Invalid Credentials"})
        }

        const loginToken = jwt.sign({
            id: userFound._id
        }, process.env.TOKEN_SECRET_KEY);

        res.status(201).send({status: 201, message: "user login successfully", loginToken, userFound});

    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const LogoutController = async (req, res)=>{
    try {
        res.status(201).send({status: 201, message: "user logout successfully"});
    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const ForgotPasswordController = async (req, res)=>{
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).send({status: 400, message: "Email is Required"});
        }

        const userFound = await alluser.findOne({ email });

        if(!userFound){
            return res.status(400).send({status: 400, message: "user not found...!"});
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        const resetTokenExpire = Date.now() + 1 * 60 * 60 * 1000; 

        userFound.resetPasswordToken = resetToken;
        userFound.resetPasswordTokenExpire = resetTokenExpire;
        
        await userFound.save();

        const sendingForgotPasswordLink = `http://localhost:5173/resetPassword/${resetToken}`;

        sendMailVerification(email, sendingForgotPasswordLink);

        return res.status(201).send({status: 201, message: `Reset password email has been sent to ${email}`});
    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const ResetPasswordController = async (req, res)=>{
    try {
        const {password, confirmPassword} = req.body;
        const token = req.params.token;

        if(!password || !confirmPassword || !token){
            return res.status(400).send({status: 400, message: "All inputs Required"});
        }
        
        if(password !== confirmPassword){
            return res.status(400).send({status: 400, message: "confirm password not match"});
        }

        const userFound = await alluser.findOne({resetToken: token})

        if(!userFound){
            res.status(400).send({status: 400, message: "Invalid or expired token"});
        }

        const now = Date.now();

        if(now > userFound.resetPasswordTokenExpire){
            res.status(400).send({status: 400, message: "The reset token has been expired"});
        }

        const encryptPass = await bcrypt.hash(confirmPassword, 10);

        userFound.password = encryptPass;

        userFound.resetPasswordToken = undefined;
        userFound.resetPasswordTokenExpire = undefined;

        userFound.save();

        res.status(201).send({status: 201, message: "Password Reset successfully"});

    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const GetApplications = async (req, res)=>{
    try {
        const response = await Application.find()
        res.status(201).send({status: 201, message: "Getting All Data successfully", response});
    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

const AddAllApplicationData = async(req, res)=>{
    try {
        const {category, subCategory, amount, year} = req.body;
        console.log(category, subCategory, amount, year)
        
        if(!category || !subCategory || !amount || !year){
            return res.status(400).send({status: 400, message: "inputs required"});
        }
        
        const response = await Application.create({
            category,
            subCategory,
            amount,
            year
        })
        res.status(201).send({status: 201, message: "application submit successfully", response});
    } catch (error) {
        res.status(500).send({status: 500, message: error.message});
    }
}

export {SignupController, LoginController, GetApplications, LogoutController, AddAllApplicationData, ForgotPasswordController, ResetPasswordController};
