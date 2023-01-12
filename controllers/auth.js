import bcrypt from 'bcrypt';
import User from "../models/User.js";

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