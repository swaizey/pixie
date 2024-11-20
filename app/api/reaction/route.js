import connectMongoDB from "@/app/connectDB";
import Reaction from "@/app/models/msgSchema";
import Post from "@/app/models/postSchema";
import { NextResponse } from "next/server";


export async function GET(request) {

 
  
    await connectMongoDB();
    try{
      const react = await Reaction.find().sort({createdAt:-1})
  
      return NextResponse.json(react);
    }catch(error){
      return NextResponse.json({msg:"Something went wrong"},{status:500})
    }
  
  }
  

export async function POST(request) {
  const { post, posterId, posterUsername, postId} =
    await request.json();

  await connectMongoDB();
  const react = await Post.findById({_id:postId})
 if(react){
         await react?.reaction?.push({
            post, posterId, posterUsername
      })
        await react?.reaction?.save()
  return NextResponse.json(react);
 }else{
      return NextResponse.json('Not found')
 }
    }
