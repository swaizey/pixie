import chatSchema from '@/app/models/chatSchema'
import connectMongoDB from '@/app/connectDB'
import { NextResponse } from 'next/server'
export async function GET(request, {params}){
    const members = params.single
    const members2 = params.single.toReversed()
    connectMongoDB()
    try {
        const chatExist = await chatSchema.find({$or:[{members:members2},{members:members}]})
        console.log(chatExist)
    return NextResponse.json(chatExist)
    } catch (error) {
    return NextResponse.json({msg:error},{status:500})
        
    }
    
}
