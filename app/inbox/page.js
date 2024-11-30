"use client";
import React, { useEffect, useState } from "react";
import logo1 from "@/app/assets/babe.jpeg";
import logo2 from "@/app/assets/lady.jpeg";
import logo3 from "@/app/assets/dude.jpeg";
import logo4 from "@/app/assets/bros.jpeg";
import logo5 from "@/app/assets/babe1.jpeg";
import Styles from "@/app/inbox/inbox.module.css";
import { useSession } from "next-auth/react";
import logo from '@/app/assets/profileLogo.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { formatDistance } from "date-fns";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
  const { data: session } = useSession();
  const router = useRouter()
  if(!session){
    router.push('/login')
  }

  const [status, setStatus] = useState([
    { username: "Sly", pic: logo1 },
    { username: "Bruce", pic: logo2 },
    { username: "Mmeso", pic: logo3 },
    { username: "Chisom", pic: logo4 },
    { username: "Iwebi", pic: logo5 },
  ]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session) {
      const getChats = async () => {
        const res = await fetch(
          `/api/chat?id=${session?.user.id}`
        );
        const data = await res.json();
        if (res.ok) {
        
          setChats(data);
        }
      };
      getChats();
    }
  }, [session]);

  return (
    <div style={{display:"grid", gridTemplateRows:"100px auto"}}>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {status?.map((st, i) => (
          <SwiperSlide  key={i}>
            <div>
              <div className="statusRing">
                <Image src={st.pic} alt="pic" width={100} height={100} />
              </div>
              <p>{st?.username}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={Styles.message}>
     
        {session &&
          chats?.map((msg) => (
            <>
              <Link
                href={`/chat/${session?.user?.id}/${
                  msg?.members?.filter((id) => id !== session?.user?.id)[0]
                }`}
                className={Styles.msg}
                key={msg?._id}
              >

                <Image
                  src={msg?.userInfo?.filter((id) => id._id !== session?.user?.id)[0]?.profilePic == undefined ? logo :msg?.userInfo?.filter((id) => id._id !== session?.user?.id)[0]?.profilePic}
                  width={100}
                  height={100}
                  alt="pic"
                />
                <div className={Styles.text}>
                  <p>
                    {
                      msg?.userInfo?.filter(
                        (id) => id._id !== session?.user?.id
                      )[0]?.username
                    }
                  </p>
                  <p>{msg?.chat.map((c) => c).slice(0 - 1)[0].message}</p>
                </div>
                <p>
                  {formatDistance(
                    new Date(),
                    msg?.chat.map((c) => c).slice(0 - 1)[0].createdAt
                  )}
                </p>
              </Link>
            </>
          ))}

      </div>
    </div>
  );
};

export default page;
