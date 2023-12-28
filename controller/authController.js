import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"
export const registerController = (async(req,res,next) =>{
const {name,email,password,address, phoneNumber} = req.body
        if(!name){
            next("Name is Required");
            // return res.status(400).send({success:false,message:"Please provide Name"})
        }
        if(!email){
            next("Email is Required");
            // return res.status(400).send({success:false,message:"Please provide Email"})
        }
        if(!password){
            next("Password is Required");
            // return res.status(400).send({success:false,message:"Please provide Password"})
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            next("Email Already Register Please Login")
            
        }
        const user = await userModel.create({name,email,password,address,phoneNumber});
        const token = user.createJWT();
        res.status(201).send({
            success:true,
            message:"User created Successfully",
            user:{
                name:user.name,
                email:user.email,
                address:user.address,
                phoneNumber:user.phoneNumber,

            },
            token,
        })
        // console.log(token);
 })
 export const loginController = async(req,res,next) =>{
    const {email,password} = req.body;
    if(!email||!password){
        next("Please provide all Fields")
    }
    const user =await userModel.findOne({email}).select("+password")
    if(!user){
        next("Invalid Username or password")
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next("Invalid Username or Password");
    }
    user.password=undefined;
    const token = user.createJWT();
    res.status(200).json({
        success:true,
        message:"LOGIN SUCCESSFULLY",
        user,
        token,
    });
 };
