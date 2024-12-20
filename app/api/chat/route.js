import chatSchema from '@/app/models/chatSchema'
import connectMongoDB from '@/app/connectDB'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
export async function POST(request){
    const {members,username,message,senderId} = await request.json()
    await connectMongoDB()
    const members1 = [members[0],members[1]]
    const members2 = [members[1],members[0]]
    try {
        const chatExist = await chatSchema.find({$or:[{members:members1},{members:members2}]});
            if(chatExist.length !== 0){
            await chatExist[0]?.chat?.push(
                {username:username,
                    message:message,
                    senderId:senderId}
                )
                await chatExist[0]?.save()
                return NextResponse.json(chatExist[0]?.chat)
    
        }else{
            const newChat = await chatSchema.create({
                members:members,
                chat:{username,
                    message,
                    senderId}
            })
            return NextResponse.json(newChat)
        }
    } catch (error) {
        return NextResponse.json(error)

    }

}
export async function GET(req){
    const id = req.nextUrl.searchParams.get('id')
    
    await connectMongoDB()
    const chat = await chatSchema.aggregate([
        {$match:{members:new mongoose.Types.ObjectId(id)}},

        { $lookup: {
            from: "users",
            localField: 'members',
            foreignField: "_id",
            as: "userInfo"
          }},
          {
            $unset:["userInfo[0].password", "userInfo.password", "userInfo[1].verificationToken", "userInfo.verificationToken", "userOne", "userTwo"]
          },
        {$sort:{createdAt:-1}}
    ])
    return NextResponse.json(chat)

    }
