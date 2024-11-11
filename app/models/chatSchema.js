import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    chat:[{
        type:new mongoose.Schema({
        username:String,
        message:String,
        senderId:String
        },{timestamps:true})
    }]
},{timestamps:true})

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)
export default Chat