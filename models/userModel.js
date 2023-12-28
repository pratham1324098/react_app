import mongoose from 'mongoose';
import validator from "validator"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Require"]
    },
    email:{
        type:String,
        required:[true,"Email is Require"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"Password is require"],
        minlength:[6,"Password length should be greater than 6 characters."],
        select:true,
    },
    address:{
        type:String,
        required:[true,"Address is Require"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"phoneNumber is Require"]
    }
    
},{
    timestamps:true
});
userSchema.index({ name: 'text' });
userSchema.pre("save",async function(){
    if(!this.isModified) return ;
    const salt = await bcrypt.genSalt(1);
    this.password =  await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch;
}

userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.SECRET_KEY,{expiresIn:"1d"})
}

export default mongoose.model("User",userSchema);