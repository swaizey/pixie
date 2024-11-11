import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const newId = new mongoose.Types.ObjectId(id)
    await connectMongoDB();
    const user = await User.findOne({ _id: newId });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({error:error},{status:500});
    
  }
 
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const newId = new mongoose.Types.ObjectId(id);
  const { profilePic } = await req.json();
  await connectMongoDB();
  console.log(profilePic);
  if(profilePic ==undefined){
    return NextResponse.json({msg:'Error uploading try again'}, {status:400});
  }
  const user = await User.findOneAndUpdate(
    { _id: newId },
    { profilePic: profilePic }
  );
  return NextResponse.json(user);
}
