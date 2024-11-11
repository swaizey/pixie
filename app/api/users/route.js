import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";



export async function POST(request) {
  const { profilePic,username, name, lastname, phone, mail, address, password,likes,gender,location } =
    await request.json();

  await connectMongoDB();
  const user = await User.findOne({ $or: [{ mail }, { phone }, { username }] });
  try {
    if (user && user.mail == mail) {
    
      return NextResponse.json(
        { message: `User with ${mail} already exist` },
        { status: 401 }
      );
    } else if (user && user.phone == phone) {
      return NextResponse.json(
        { message: `User with ${phone} already exist` },
        { status: 401 }
      );
    } else if (user && user.username) {
      return NextResponse.json(
        { message: `User with ${username} already exist` },
        { status: 401 }
      );
    } else {
      const saltRound = 8;
      const pass = await bcrypt.hash(password, saltRound);

      const newUser = await User.create({
        profilePic,
        username,
        name,
        lastname,
        phone,
        mail,
        password: pass,
        gender,
        location,
      });

      return NextResponse.json(
        { message: "User created" },
        newUser,
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 400 });
  }
}

export async function GET(request) {

  const url = new URL(request.url)

  const page = Number(url.searchParams.get("page")) || 0
  const userParPage = 2

  await connectMongoDB();
  const user = await User.find().skip(page * userParPage).limit(userParPage)

  return NextResponse.json(user);
}
