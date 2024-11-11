import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server';



  export async function POST(req) {
    cloudinary.config({ 
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME, 
      api_key: process.env.CLOUDINARY_APIKEY, 
      api_secret: process.env.CLOUDINARY_APISECRET,
      secure:true
    });
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const {image} = await req.json()
    const result =await cloudinary.uploader.upload(image, options)
    return NextResponse.json( {...result})
  }