import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

export const registerUser = async (req,res)=>{
    try{

        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields required"})
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }
    
        const user = User.create({name, email, password, role})
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role)
        });
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

export const loginUser = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "invalid credentials!"})
        const isMatch = await User.matchPassword(password)
        if(!isMatch)  return res.status(400).json({message: "invalid credentials!"})
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role)
        });
    } catch (err){
        res.status(500).json({message: err.message})
    }
}