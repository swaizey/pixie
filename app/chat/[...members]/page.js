'use client'

import React, { useState,useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiFlag1 } from "react-icons/ci";
import Styles from '@/app/chat/[...members]/chat.module.css'
import Image from "next/image";
import SendMsg from "../../component/sendmsg/sendMsg";
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { formatDistance } from "date-fns";
import logo from '@/app/assets/profileLogo.png'

const page = () => {
  const { data: session } = useSession();
  const router = useRouter()
  // if(!session){
  //   router.push('/login')
  // }
  const messagesEndRef = useRef(null)
  const params = useParams()
  const [chats, setChats]= useState([])
  const [sent, setSent] = useState(false)
  const [otherUser,setOtherUser] = useState([])
  let otherId
  if(session){
    otherId = (params?.members?.filter(other => other !== session?.user?.id)[0])
  }
  console.log(chats, params[0]?.members)
   const getChat = async()=>{
      const res = await fetch(`/api/chat/${params?.members[0]}/${params?.members[1]}`)
      
      if(res.ok){
      const data = await res.json()
        setChats(data)
      }
    }
    getChat()
//   useEffect(() => {
   
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
// }, [JSON.stringify(chats),sent])

    useEffect(()=>{
      const getUser = async()=>{
        if(otherId){
          const other = await fetch(`/api/users/${otherId}`)
          const data2 = await other.json()
        if(other.ok){
          setOtherUser(data2)
        }
        }
      }
    getUser()

    },[otherId])
  return (
    <div>
    <div className={Styles.chat}>
      <div className={Styles.nav}>
        <FaArrowLeft />
        <div className={Styles.navInfo}>
          <Image src={otherUser.profilePic == undefined ? logo :otherUser.profilePic } width={100} height={100} alt="imgs"/>
          <div >
            {otherUser&&<p>@{otherUser.username}</p>}
            <p>Active 5 hours ago</p>
            </div>
            </div>
        <HiDotsHorizontal />
        <CiFlag1 />
      </div>

      <div className={Styles.chatContiner}>
        <div className={Styles.chatInfo}>
        <Image src={otherUser.profilePic == undefined ? logo :otherUser.profilePic} width={100} height={100} alt="imgs"/>
            <p style={{fontWeight:"bold"}}>{otherUser.firstname} {otherUser.lastname}</p>
            {otherUser&&<p>@{otherUser.username}</p>}
            <p>1101 following . 1094 followers</p>
            <div className={Styles.chats}>
              {chats[0]?.chat.map((chat, i)=>(
                <div className={`${chat.senderId == session?.user?.id ? Styles.me : Styles.other} ${Styles.msgs}`} key={i}>
                  <span>{formatDistance(new Date(),chat.createdAt ) }</span>
                  <p>{chat.message}</p>
                </div>
              ))}
            </div>
        <div ref={messagesEndRef}></div>
        </div>
      </div>
    </div>
    <SendMsg otherId={otherId} setSent={setSent} sent={sent} />
    </div>
  );
};

export default page;
