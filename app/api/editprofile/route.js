import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { firstname, lastname, phone, address,id,mail } = await req.json();
  const user = await User.findByIdAndUpdate({_id:id},{firstname:firstname, lastname:lastname,phone:phone,address:address,mail:mail})
  return NextResponse.json(user)
}
