const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { default: mongoose } = require('mongoose');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1h'
    })
}

registerUser = async (req,res)=>{
    const {fullName,email,password,profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message:"Please enter all fields"});
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        });
    }
    catch{err}{
        res.status(500).json({message:"Error registering user",error:err.message});
    }
}

loginUser = async (req,res)=>{}

getUserInfo = async (req,res)=>{}

module.exports = {registerUser,loginUser,getUserInfo}
