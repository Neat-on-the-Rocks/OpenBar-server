import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from "jsonwebtoken"

/*Register User*/
export const register = async (req, res) => {
    try{
        const { firstName, lastName, email, password, pictruePath, friends, location, occupation } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: passwordHash, 
            pictruePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: 0, //Work on this later
            impressions: 0, //Work on this later
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser) //201 create
    } catch (err){
        res.status(500).json({error: err.message})
    }
}

/*Login User*/ 

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if(!user){
            res.status(400).json({msg: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({msg: "Invalid email or password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token, user})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}