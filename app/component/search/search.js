'use client'
import Image from 'next/image'
import{useEffect,useState} from 'react'
import Style from '@/app/component/search/search.module.css'
import dude from '@/app/assets/dude.jpeg'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import logo from '@/app/assets/profileLogo.png'
const search = ({opened, setOpened}) => {
    const {data:session} =useSession()
    const [users, setUsers]= useState('')
    const [name, setName] = useState('')
    useEffect(()=>{
        const getUsers =async()=>{
            const res = await fetch(`https://mypixie.netlify.app/api/search?name=${name}`)
            if (res.ok){
                const data = await res.json()
                setUsers(data)
            }
    }
    getUsers()

 },[name])

    let filterUser
    if(users){
         filterUser = users?.filter(use => use?._id !== session?.user?.id)
    }
    
  return (
    <div className={ `${Style.search} ${opened ? Style.ent : null} `}>
        <div className={Style.flex}>
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder='Search User'
        />
                <button onClick={() =>setOpened(false)} className={Style.btn}>x</button>
        </div>
        <div>
       

               {filterUser && filterUser?.map(user =>(
                    <div key={user?._id} className={Style.user}>
                    <Image src={user?.profilePic == undefined ? logo :user?.profilePic } width={70} height={70} alt='img'/>
                    <p>{user?.username}</p>
                    <div className={Style.btns}>
                        <button>Follow</button>
                        <button><Link href={`chat/${session?.user?.id}/${user?._id}`}>Chat</Link></button>
                    </div>
                </div>
               ))}
    
        </div>
    </div>
  )
}

export default search