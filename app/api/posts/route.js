import connectMongoDB from "@/app/connectDB";
import Post from "@/app/models/postSchema";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";



export async function POST(request) {
  const { post, img, posterId, videoUrl} =
    await request.json();

  await connectMongoDB();
        const post1 = await Post.create({
        post, img, posterId, videoUrl
      });

      return NextResponse.json(post1);
    }

export async function GET(request) {

  const url = new URL(request.url)

  const page = Number(url.searchParams.get("page")) || 0
  const userParPage = 2
  await connectMongoDB();
  try{
    const user = await Post.find().skip(page * userParPage).limit(userParPage).sort({createdAt:-1})

    return NextResponse.json(user);
  }catch(error){
    return NextResponse.json({msg:"Something went wrong"},{status:500})
  }

}
