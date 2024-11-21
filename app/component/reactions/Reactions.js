'use client'
import {useState,useEffect} from 'react'
import Style from '@/app/component/reactions/reactions.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { formatDistance } from 'date-fns'

const Reactions = ({opened, setOpened, postId, setPostId}) => {
    const router = useRouter()
    const {data:session} = useSession()
    const [msg,setMsg] = useState([])
    const [newPost,setNewPost] = useState([])
    const [post,setPost] = useState('')
    const apiUrl = process.env.API
    console.log('post:',post, 'newpost:',newPost,'all post:',msg)
    useEffect(()=>{
        const fetchPost = async()=>{
            const res = await fetch(`/api/reaction?id=${postId}`)
            if(res.ok){
                const data = await res.json()
                setMsg(data)
            
            }
        }
        fetchPost()
    },[JSON.stringify(newPost), postId])
    console.log(postId)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!session){
            return alert('Please login')
        }
        if(!post) return alert('Make a comment')

            const res = await fetch('https://mypixie.netlify.app/api/reaction',{
            method:'POST',
            body:JSON.stringify({
                postId,
                post:post,
                posterUsername:session?.user?.username,
                posterId:session?.user?.id
            })
    })
            if(res.ok){
                const data = await res.json()
                alert('Message sent...')
                setPost('')
                setNewPost(data)
            }
    }

  return (
    <div className={`${Style.msgCon} ${opened ? null : Style.closed}`}>
    
        <button onClick={()=>(setOpened(false), setPostId(''))} className={Style.btn}>x</button>
        <div style={{display:'grid', gridTemplateRows:'auto 40px', height:'90%'}}>
        <div style={{overflowY:'auto'}}>
        {msg?.reaction?.length == 0 ? (<p>No post now</p>) : msg?.reaction?.map(m=>(
               <div key={m?._id} className={Style.msgs}>
               {msg&&<p>@{m.posterUsername}</p>}
               <p>{m.post}</p>
              <span style={{color:'grey', fontSize:'10px',marginLeft:'80%'}}>{formatDistance(new Date(), m.createdAt)}</span>
               </div>
        ))}
     
        </div>
        <div className={Style.cont}>
        <input
        value={post}
        onChange={(e)=>setPost(e.target.value)}
        placeholder='Make comment'/>
        <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>
       
    </div>
  )
}

export default Reactions
