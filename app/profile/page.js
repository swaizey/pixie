'use client'
import {UserContext} from '@/app/UserContext'
import React, { useEffect, useState,useContext } from "react";
import logo from "@/app/assets/guy1.jpeg";
import Image from "next/image";
import Styles from "@/app/profile/profile.module.css";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineHorizontalDistribute } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { RiFlowChart } from "react-icons/ri";
import { CiBookmarkCheck } from "react-icons/ci";
import { RiHeartAdd2Line } from "react-icons/ri";
import Link from "next/link";
import Images from '@/app/component/Images/Images'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
  const {data:session} = useSession()
  const {user,setUser} = useContext(UserContext)
  const router = useRouter()
  if(!session){
    router.push('/login')
  }
  return (
    <div className={Styles.profileContainer}>
      <div className={Styles.info}>
        <Link href={'/profilepic'}>{<Image  src={user?.profilePic == '' || undefined ? logo : user?.profilePic} width={100} height={100} />}</Link>
        <p style={{color:'grey'}}>@{user.username}</p>
        
        <div>
          <button ><Link href={'/editprofile'}>Edit profile</Link></button>
          <button>Share profile</button>
          <button>
            <FiUserPlus />
          </button>
        </div>
        
        <button>+ Add bio</button>
        <p>
            <FiUserPlus />
          Pixie studio</p>
      </div>
      <div className={Styles.history}>
        <button>
<MdOutlineHorizontalDistribute />

        </button>
        <button>
<CiLock />

        </button>
        <button>
<RiFlowChart />

        </button>
        <button>

<CiBookmarkCheck />
        </button>
        <button>

<RiHeartAdd2Line />
        </button>
      </div>

      <Images/>
       
    </div>
  );
};

export default page;
