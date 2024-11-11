import connectMongoDB from "@/app/connectDB";
import Reaction from "@/app/models/msgSchema";
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
  const { post, posterId, posterUsername} =
    await request.json();

  await connectMongoDB();
        const react = await Reaction.create({
            post, posterId, posterUsername
      });

      return NextResponse.json(react);
    }