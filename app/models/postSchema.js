import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    post:{
        type: String
    },
    img:[],
    like:[],
    dislikes:[],
    videoUrl:[],
    reaction:[],
    posterId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
}, {timestamps:true})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
