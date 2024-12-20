"use client";

import { useState,useEffect } from "react";
import Image from "next/image";
import Styles from "@/app/home/home.module.css";

import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import Reactions from "@/app/component/reactions/Reactions";
import Loader from "@/app/component/Loader.js";
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
  const [loading, setLoading] =useState(false)
  const [loaded, setLoaded] =useState(false)
  
  const [postId, setPostId] =useState('')
 
  
  
  useEffect(()=>{
    if(page ==0){
    const getPosts = async()=>{
      setLoading(true)
      const res = await fetch(`/api/posts?page=${page}`)
      if(res.ok){
        const data = await res.json()
        setPosts(data) 
        setLoading(false)
        setLoaded(true)
      }else{

        setErroMsg(data)
      }
    }
    getPosts()
    }
  },[])
  
  useEffect(()=>{
    if(page > 0){
    const getPosts = async()=>{

      const res = await fetch(`/api/posts?page=${page}`)
      if(res.ok){
       const data = await res.json()
       setPosts(prev => [...prev, ...data])
   
      }else{

        setErroMsg(data)
      }
    }
    getPosts()
    }
  },[page])

  const auto =  {autoplay: {
    delay: 1000,
  }}

  return (
    <div className={Styles.home}>
      {loading ? <Loader/> : posts?.map((post) => (
        <div>
      
          {opened && <Reactions opened={opened} postId={postId} setPostId={setPostId} setOpened={setOpened}/>}
          {
            <div className={Styles.post}>
                <Swiper   pagination={true} modules={[Pagination]} className="mySwiper">
                  {post?.img.filter(i =>i !== null).map(i =>(
                    <SwiperSlide autoplay={auto}className={Styles.swiper} >
                    <Image src={i} width={100} height={100} alt="100" />
                    </SwiperSlide>
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
     
    {loaded && !loading && <button className={Styles.btn} onClick={()=>setPage(page+1)}>{loading ? 'Loading...' :'Load more'}</button>}
    
    </div>
  );
};

export default Homes;
