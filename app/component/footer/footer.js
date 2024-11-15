'use client'
import { FiHome } from "react-icons/fi";
import { LuUsers2 } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { BiMessageAltDetail } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import Style from '@/app/component/footer/footer.module.css'
import Link from "next/link";
import { UserContext } from "@/app/UserContext";
import { useContext,useEffect } from "react";
import { useSession } from "next-auth/react";
const Footer = () => {
  const {data:session}= useSession()
  const {user,setUser} = useContext(UserContext)

  useEffect(()=>{
    if(session){
      const getUser = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${session?.user?.id}`)
        if(res.ok){
          const data = await res.json()
          setUser(data)
        }
      }
      getUser()
    }
  },[session])
  return (
    <div className={Style.footer}>
      <Link href={'/'}>
      <FiHome />
      <p>Home</p>
      </Link>
      <Link href={'/friends'}>
      <LuUsers2 />
      <p>Friends</p>
      </Link>
      <Link href={'/create-post'}>
      <CiCirclePlus />
      </Link>
      <Link href={'/inbox'}>
      <BiMessageAltDetail />
      <p>Inbox</p>
      </Link>
      <Link href={'/profile'}>
      <FiUser />
      <p>Profile</p>
      </Link>
 
    </div>
  );
};

export default Footer;
