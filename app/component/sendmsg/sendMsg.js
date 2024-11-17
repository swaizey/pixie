'use client'
import {useState} from 'react'
import { GrSend } from "react-icons/gr";
import Styles from '@/app/component/sendmsg/msg.module.css'
import { useSession } from 'next-auth/react';

const SendMsg = ({otherId,setSent,sent}) => {
  const {data:session} = useSession()
  const [msg, setMsg]= useState('')
  console.log(otherId, session,msg)
  const sendMsg = async(e)=>{
    e.preventDefault()
    if(otherId == null || !session || msg=='') {
      return
    }else{
    const res = await fetch('/api/chat',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        members:[session?.user?.id, otherId],
        username:session?.user?.username,
        message:msg,
        senderId:session?.user?.id
      })
    })
    if(res.ok){
      setSent(!sent)
      setMsg('')
    }
  }}
  return (
    <div className={Styles.sendMdg}>
        <form onSubmit={sendMsg}>
        <input
        placeholder='text'
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        />
       <button onClick={sendMsg}><GrSend /></button> 
          </form>
    </div>
  )
}

export default SendMsg
