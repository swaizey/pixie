import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { otherUser, currentUser} =
      await request.json();
  
    await connectMongoDB();
          const userToFollow = await User.findById({_id:otherUser});
          const  follower = await User.findById({_id:currentUser});
        
            if(userToFollow.followers.includes(currentUser)){
                await userToFollow.updateOne({$pull:{followers:currentUser}})
                await follower.updateOne({$pull:{following:otherUser}})
                return NextResponse.json({ message: "User unfollowed" },{ status: 200 });
            }else{
                await userToFollow.updateOne({$push:{followers:currentUser}})
                await follower.updateOne({$push:{following:otherUser}})
                return NextResponse.json({ message: "User followed" },{ status: 200 });
            }

      }
      export async function GET(request) {

        const url = new URL(request.url)
      
        const id = (url.searchParams.get("id"))
       
        await connectMongoDB();
        const user = await User.findById(id)
        if(user){
            const followers = await User.findById(user.followers)
            const following = await User.findById(user.following)
            ///Null error in response
            let follow = followers, followin = following
           const f = followers == null ? follow = [] : followers
           const p = following == null ? follow = [] : following
            return NextResponse.json(f, p)
        }
      }