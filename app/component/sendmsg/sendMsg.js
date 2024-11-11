'use client'
import {useState} from 'react'
import { GrSend } from "react-icons/gr";
import Styles from '@/app/component/sendmsg/msg.module.css'
import { useSession } from 'next-auth/react';

const SendMsg = ({otherId,setSent,sent}) => {
  const {data:session} = useSession()
  const [msg, setMsg]= useState('')

  const sendMsg = async(e)=>{
    e.preventDefault()
    if(otherId == null || !session || msg=='') {
      return
    }else{
    const res = await fetch('http://localhost:3000/api/chat',{
      method:"POST",
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
        <input
        placeholder='text'
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        />

       <button onClick={sendMsg}><GrSend /></button> 
    </div>
  )
}

export default SendMsg