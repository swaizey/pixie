import {useState,useEffect} from 'react'
import Style from '@/app/component/reactions/reactions.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { formatDistance } from 'date-fns'

const Reactions = ({opened, setOpened}) => {
    const router = useRouter()
    const {data:session} = useSession()
    const [msg,setMsg] = useState([])
    const [newPost,setNewPost] = useState([])
    const [post,setPost] = useState('')
    useEffect(()=>{
        const fetchPost = async()=>{
            const res = await fetch('https://mypixie.netlify.app/api/reaction')
            if(res.ok){
                const data = await res.json()
                setMsg(data)
            
            }
        }
        fetchPost()
    },[JSON.stringify(newPost)])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!session){
            return alert('Please login')
        }
        if(!post) return alert('Make a comment')

            const res = await fetch('https://mypixie.netlify.app/api/reaction',{
            method:'POST',
            body:JSON.stringify({
                post:post,
                posterUsername:session?.user?.username,
                posterId:session?.user?.id
            })
    })
            if(res.ok){
                const data = await res.json()
                alert('Message sent...')
                setNewPost(data)
            }
    }
    console.log(msg)
  return (
    <div className={`${Style.msgCon} ${opened ? null : Style.closed}`}>
    
        <button onClick={()=>setOpened(false)} className={Style.btn}>x</button>
        <div style={{display:'grid', gridTemplateRows:'auto 40px', height:'90%'}}>
        <div style={{overflowY:'auto'}}>
        {msg?.map(m=>(
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