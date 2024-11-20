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
  
      return NextResponse.json(react[0]?.reaction);
    }catch(error){
      return NextResponse.json({msg:"Something went wrong"},{status:500})
    }
  
  }
  

export async function POST(request) {
  const { post, posterId, posterUsername, postId} =
    await request.json();

  await connectMongoDB();
  const react = await Post.findById({_id:postId})
 return NextResponse.json(react)
 if(react){
    
         await react[0]?.reaction?.push({
            post:post, posterId:posterId, posterUsername:posterUsername
      })
        await react?.reaction?.save()
  return NextResponse.json(react);
 }else{
      return NextResponse.json('Not found')
 }
    }
