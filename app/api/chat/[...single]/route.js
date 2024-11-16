import chatSchema from '@/app/models/chatSchema'
import connectMongoDB from '@/app/connectDB'
import { NextResponse } from 'next/server'

export async function GET(request, {params}){
    const members = params.single
    const members2 = params.single.toReversed()
<<<<<<< HEAD
    console.log(params)
    connectMongoDB()
=======
    connectMongoDB()
  
>>>>>>> 7ce7f03db82bb617b2aa35c4e4d681fc9f89167c
    try {
        const chatExist = await chatSchema.find({$or:[{members:members2},{members:members}]})
        console.log(chatExist)
    return NextResponse.json(chatExist)
    } catch (error) {
    return NextResponse.json({msg:error},{status:500})
        
    }
    
}
