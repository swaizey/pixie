import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";



export async function GET(request) {
    const name = request.nextUrl.searchParams.get("name")

    await connectMongoDB();
      const user = await User.find({$or: [{'username': { $regex: name, $options: 'i' }}, {'firstname': { $regex: name, $options: 'i' }}] })
      return NextResponse.json(user);
  
  }