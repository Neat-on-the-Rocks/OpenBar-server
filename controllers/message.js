import Message from "../models/Message.js"

export const newMessage = async (req, res) => {

    try {

        const message = new Message(req.body)
        
        const savedMessage = await message.save()
        res.status(201).json(savedMessage)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const getMessages = async(req, res) => {
    try {
        const{ conversationId } = req.params
        const messages = await Message.find({
            conversationId
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}