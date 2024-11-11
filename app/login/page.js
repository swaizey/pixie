'use client'
import {useState} from 'react'
import Styles from './login.module.css'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const page = () => {
    const {data:session} = useSession()
  
    const router = useRouter()
    if(session){
      router.push('/')
    }
    const [usernameMail, setUsernameMail] = useState('')
    const [password, setPassword] = useState('')
  
  
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!password){
          return alert('Password is required')
        }else if(!usernameMail){
          return alert('Username or mail is required')
        }
          try {
           const res = await signIn('credentials', {
              usernameMail, password, redirect:false
            })
            if(res.error){
              return alert("Invalid Credentials")
            }
            router.push('/')
          } catch (error) {
            console.log(error)
          }
      }
  return (
    <div className={Styles.register}>
        <form onSubmit={handleSubmit}>
        <p>Login</p>
        
            <input 
                placeholder='Username'
                onChange={(e) =>setUsernameMail(e.target.value)}
                value={usernameMail}
                />
        
            <input 
                placeholder='Password'
                onChange={(e) =>setPassword(e.target.value)}
                value={password}
                />
    
                <button className={Styles.submit} onClick={handleSubmit}>Submit</button>
               <p> Don't have an Acocunt? <Link href={'/register'}>Register</Link></p>
        </form>

    </div>
  )
}

export default page