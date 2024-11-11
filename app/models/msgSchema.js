import mongoose, { Schema } from "mongoose";

const msgSchema = new Schema({
    post:{
        type: String
    },
    posterUsername:{
        type:String
    },
    posterId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
}, {timestamps:true})

const Reaction = mongoose.models.Reaction || mongoose.model('Reaction', msgSchema)

export default Reaction