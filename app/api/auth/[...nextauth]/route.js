import connectMongoDB from "@/app/connectDB";
import User from "@/app/models/userSchema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
const authOptions ={
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{},

            async authorize(credentials){
                const {usernameMail, password} = credentials

                try {
                    await connectMongoDB()
                    const user = await User.findOne({$or:[{username:usernameMail}, {mail:usernameMail}]})
                    if(!user){
                        return null
                    }
                    const pwd =await bcrypt.compare(password,user.password)
                    if(!pwd){
                        return null
                    }
                    return user
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user,session}){
            
            if(user){
                return{
                    ...token,
                    id:user.id,
                    username:user.username,

                }
            }
            return token
        },
        async session({session, token, user}){

            return{
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                    username:token.username,

                }
            };
            
        }
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
    pages:{
        signIn:"login"
    }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}