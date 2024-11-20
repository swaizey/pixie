import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    post:{
        type: String
    },
    img:[],
    like:[],
    dislikes:[],
    videoUrl:[],
    reaction:[{
        type:new mongoose.Schema({
        post:String,
        posterId:String,
        posterUsername:String
        },{timestamps:true})
    }],
    posterId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
}, {timestamps:true})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
