import Conversation from "../models/Conversation.js"

export const newConversation = async (req, res) => {

    try {

        const {senderId, receiverId} = req.body;

        const conversation = new Conversation({
            members: [senderId, receiverId]
        })
        
        const savedConversation = await conversation.save()
        res.status(201).json(savedConversation)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const getConversation = async(req, res) => {
    try {

        const {userId} = req.params;

        const conversation = await Conversation.find({
            members: {$in: [userId]}
        });

        res.status(200).json(conversation);
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}