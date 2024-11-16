import chatSchema from '@/app/models/chatSchema'
import connectMongoDB from '@/app/connectDB'
import { NextResponse } from 'next/server'

export async function GET(request){
    const url = new URL(request.url)
    const url1 = url.searchParams.get("id").slice(0,24)
    const url2 = url.searchParams.get("id").slice(24)
    const u = url.searchParams.get("id")

    connectMongoDB()
    try {
        const chatExist = await chatSchema.find({$or:[{members:[url1,url2]},{members:[url2,url1]}]})
        console.log(chatExist)
    return NextResponse.json(chatExist)
    } catch (error) {
    return NextResponse.json({msg:error},{status:500})
        
    }
    
}