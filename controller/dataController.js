import userModel from "../models/userModel.js";

export const searchUsersByName = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await userModel.find({ $text: { $search: name } });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find(); 
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  export const removeuser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Check if the user with the given ID exists
      const existingUser = await userModel.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Remove the user
      await existingUser.deleteOne();
  
      // Fetch updated list of users
      const updatedUsers = await userModel.find();
  
      res.status(200).json({ success: true, message: 'User removed successfully', users: updatedUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  export const createUser = async(req,res,next) =>{
    const {name,email,password,address,phoneNumber} = req.body;
    if(!name||!email||!password||!address||!phoneNumber){
        next("Provide all fields")
    }
    const user = await userModel.create(req.body);
    res.status(201).json({success:true,message:"user create Successfully",user});
  }