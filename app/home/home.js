"use client";

import { useState,useEffect } from "react";
import Image from "next/image";
import Styles from "@/app/home/home.module.css";

import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import Reactions from "@/app/component/reactions/Reactions";
import { CgProfile } from "react-icons/cg";

import logo from '@/app/assets/profileLogo.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Link from "next/link";
const Homes = () => {
  
  const [page, setPage] = useState(0)
  const [posts, setPosts] =useState([])
  const [erroMsg, setErroMsg] =useState('')
  const [opened, setOpened] =useState(false)
  const [postId, setPostId] =useState('')
 
  
  
  useEffect(()=>{
    const getPosts = async()=>{
      const res = await fetch(`/api/posts?page=${page}`)
      if(res.ok){
        const data = await res.json()
        page ==0 ? setPosts(data) : setPosts(prev => [...prev, ...data])
      }else{
        const data = await res.json()
        setErroMsg(data)
      }
    }
    getPosts()
    
  },[page])

  const auto =  {autoplay: {
    delay: 1000,
  }}
  console.log(postId)
  return (
    <div className={Styles.home}>
      {posts && posts?.map((post) => (
        <div>
        {console.log(post?.img.filter(i =>i !== null).map(i => i))}
          {opened && <Reactions opened={opened} postId={postId} setPostId={setPostId} setOpened={setOpened}/>}
          {
            <div className={Styles.post}>
                <Swiper   pagination={true} modules={[Pagination]} className="mySwiper">
                  {post?.img.map(img=>(
                    <>
                    <SwiperSlide autoplay={auto}className={Styles.swiper} >
                    <Image src={img} width={100} height={100} alt="100" />
                    </SwiperSlide>
                    {console.log(filteredImg)}
                    </>
                  ))}
                </Swiper>

              <div className={Styles.icon}>
                <>
                <FaHeart />
                <p>233</p>
                </>
                <>
                <button onClick={()=>(setOpened(true),setPostId(post._id))}><MdMessage border/></button>
                <p>{'100'}</p>
                </>
                <>
             
                <Link href={`/profilecard/${post.posterId}`}><CgProfile /></Link>
                </>
                <>
                <IoIosShareAlt />
                <p>{'200'}</p>
                </>
              </div>
            </div>
          }
        </div>
      ))}
    
      {erroMsg && <p>{erroMsg.msg}</p>}
      {posts.length !== 0 ?<button className={Styles.btn} onClick={()=>setPage(page+1)}>Load More</button> : <p style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Loading...</p>}
    </div>
  );
};

export default Homes;
