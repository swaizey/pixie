import connectMongoDB from "@/app/connectDB";
import Reaction from "@/app/models/msgSchema";
import Post from "@/app/models/postSchema";
import { NextResponse } from "next/server";


export async function GET(request) {

 
  const url = new URL(request.url)

  const id = url.searchParams.get("id")

    await connectMongoDB();
    try{
      const react = await Post.findById({_id:id}).sort({createdAt:-1})
  
      return NextResponse.json(react?.reaction);
    }catch(error){
      return NextResponse.json({msg:"Something went wrong"},{id:id},{status:500})
    }
  
  }
  

export async function POST(request) {
  const { post, posterId, posterUsername, postId} =
    await request.json();

  await connectMongoDB();
  const react = await Post.findById({_id:postId})

 if(react){
    await react?.reaction?.push({post:post, posterId:posterId, posterUsername:posterUsername})
    await react[0]?.save()
    return NextResponse.json(react);
 }else{
      return NextResponse.json('Not found')
 }
    }
