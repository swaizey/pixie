'use client'
import { UserContext } from "@/app/UserContext";
import { useContext,useEffect,useState } from "react";
import Styles from '@/app/editprofile/edit.module.css'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const page = () => {
    const router = useRouter()
    const {user,setUser} = useContext(UserContext)
    const {data:session} = useSession()
   
  
    if(!session){
      router.push('/login')
    }

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [mail, setMail] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      if(user.lenght !==0){
        setFirstname(user?.firstname)
        setLastname(user?.lastname)
        setPhone(user?.phone)
        setAddress(user?.address)
        setMail(user?.mail)
      }
    },[JSON.stringify(user)])

    const editProile =async (e)=>{
      setLoading(true)
      e.preventDefault()
      const res = await fetch('http://localhost:3000/api/editprofile',{
        method:"PUT",
        body:JSON.stringify({
          firstname:firstname,
          lastname:lastname,
          address:address,
          phone:phone,
          id:user?._id,
          mail:mail
        })
      })
      if(res.ok){
        router.push('/profile')
        setLoading(false)
      }
    }
  return (
    <div className={Styles.edit}>
      <h2>Edit user Proffile</h2>
        <form onSubmit={editProile}>
            <p>First name</p>
            <input
            onChange={(e)=>setFirstname(e.target.value)}
            value={firstname}
            placeholder="Firstname"
            />
            <p>Last name</p>
            <input
            onChange={(e)=>setLastname(e.target.value)}
            value={lastname}
            placeholder="Lastname"
            />
            <p>Phone</p>
            <input
            onChange={(e)=>setPhone(e.target.value)}
            value={phone}
            placeholder="Phone"
            />
            <p>Address</p>
            <input
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            />
            <p>Mail</p>
            <input
            onChange={(e)=>setMail(e.target.value)}
            value={mail}
            placeholder="Mail"
            />
            <button disabled={loading} style={{cursor:loading ? 'progress': 'pointer'}}>Submit</button>
        </form>
    </div>
  )
}

export default page