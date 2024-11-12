'use client'
import { UserContext } from "@/app/UserContext";
import { useContext,useEffect,useState } from "react";
import logo from '@/app/assets/lady.jpeg'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Styles from '@/app/profilecard/[id]/card.module.css'
import { useParams } from "next/navigation";
import Link from "next/link";
const page = () => {
  const {id} = useParams()
  const {data:session} = useSession()
  const [user,setUser] = useState()

  useEffect(()=>{
    const getUserInfo = async()=>{
      if(id){
        const res = await fetch(`https://mypixie.netlify.app/api/users/${id}`)
        const data = await res.json()
        if(res.ok){
          setUser(data)
        }
      }
    }
    getUserInfo()
  },[id])
  return (
    <div className={Styles.cardCon}>
      {!user && <p>Loading...</p>}
{ user &&  <div className={Styles.card}>
        <Image src={user?.profilePic} width={100} height={100} alt="img"/>
        <p>@${user?.username}</p>
        <p>{user?.firstname} {user?.lastname}</p>
        <p>{user?.phone}</p>
        <p>{user?.mail}</p>
        <p>{user?.address}</p>
        <p>{user?.gender}</p>
        <p>Folloing: 200</p>
        <p>Followers: 100</p>
        <div>
        <button>Follow</button>
        {user?._id == session?.user?.id ? null :<button ><Link style={{textDecoration:'none',color:'white'}} href={`/chat/${user?._id}/${session?.user?.id}`}>Chat</Link></button>}
        </div>
      </div>}
    </div>
  )
}

export default page