import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true,
    },
    firstName: {
        type:String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type:String,
        required: true,
        min: 2,
        max: 50,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: { //Update to an array of strings eventually to render people who like it but O(n) vs O(1)
        type: Map,
        of: Boolean,
    }, 
    comments: {
        types: Array,
        default: [],
    }
}, {timestamps: true})

export default mongoose.model("Post", PostSchema)

