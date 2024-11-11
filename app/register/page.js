'use client'
import {useState} from 'react'
import Styles from './register.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [mail, setMAil] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [password, setPassword] = useState('')
    const [confirmP, setConfirmP] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    
    const handleSUbmit = async(e) =>{
        e.preventDefault()
         if(password !== confirmP){
      alert('password must match')
      return
    }
        if(!name){
            alert('Name is required')
            return
        }
        if(!lastname){
            alert('lastname is required')
            return
        }
        if(!username){
            alert('username is required')
            return
        }
        if(!phone){
            alert('phone is required')
            return
        }
        if(!mail){
            alert('mail is required')
            return
        }
        if(!location){
            alert('location is required')
            return
        }
        if(!password){
            alert('password is required')
            return
        }
        if(!gender){
            alert('gender is required,please select a gender')
            return
        }
        const res = await fetch('http://localhost:3000/api/users',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                name,
                username,
                lastname,
                location,
                password,
                mail,
                phone,
                gender
            })
        })
        if(res.ok){
            router.push('/')
        }else {
            const msg = await res.json()
            alert(msg.message)
        }
    }
  return (
    <div className={Styles.register}>
        <form onSubmit={handleSUbmit}>
        <p>Register</p>
            <input 
                placeholder='Name'
                onChange={(e) =>setName(e.target.value)}
                value={name}
                />
            <input 
                placeholder='Lastname'
                onChange={(e) =>setLastname(e.target.value)}
                value={lastname}
                />
            <input 
                placeholder='Username'
                onChange={(e) =>setUsername(e.target.value)}
                value={username}
                />
            <input 
                placeholder='Mail'
                onChange={(e) =>setMAil(e.target.value)}
                value={mail}
                />
            <input 
                placeholder='Phone'
                onChange={(e) =>setPhone(e.target.value)}
                value={phone}
                />
            <input 
                placeholder='Location'
                onChange={(e) =>setLocation(e.target.value)}
                value={location}
                />
            <input 
                placeholder='Password'
                onChange={(e) =>setPassword(e.target.value)}
                value={password}
                />
            <input 
                placeholder='Confirm passwor'
                onChange={(e) =>setConfirmP(e.target.value)}
                value={confirmP}
                />
                <div className={Styles.gender}> 
                <p style={{background:gender == "Boy" ? "green" : "grey"}} onClick={()=>setGender('Boy')}>Boy</p>
                <p  style={{background:gender == "Girl" ? "green" : "grey"}} onClick={()=>setGender('Girl')}>Girl</p>               
                </div>
                <button className={Styles.submit} onClick={handleSUbmit}>Submit</button>
               <p> Already have an Acocunt? <Link href={'/login'}>Login</Link></p>
        </form>

    </div>
  )
}

export default page