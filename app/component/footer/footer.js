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
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathame = usePathname()
  const {data:session}= useSession()
  const {user,setUser} = useContext(UserContext)

  useEffect(()=>{
    if(session){
      const getUser = async ()=>{
        const res = await fetch(`/api/users/${session?.user?.id}`)
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
        <div className={Style.foot}>
      <Link className={pathame == '/' ? Style.bg : null} href={'/'}>
      <FiHome />
      <p>Home</p>
      </Link>

      <Link className={pathame == '/friends' ? Style.bg : null} href={'/friends'}>
      <LuUsers2 />
      <p>Friends</p>
      </Link>
      <Link className={pathame == '/create-post' ? Style.bg : null} href={'/create-post'}>
      <CiCirclePlus />
      </Link>
      <Link className={pathame == '/inbox' ? Style.bg : null} href={'/inbox'}>
      <BiMessageAltDetail />
      <p>Inbox</p>
      </Link>
      <Link className={pathame == '/profile' ? Style.bg : null} href={'/profile'}>
      <FiUser />
      <p>Profile</p>
      </Link>
  </div>
    </div>
  );
};

export default Footer;
