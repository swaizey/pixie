"use client";
import logo1 from "@/app/assets/babe.jpeg";
import logo2 from "@/app/assets/babe1.jpeg";
import logo3 from "@/app/assets/bros.jpeg";
import logo4 from "@/app/assets/dude.jpeg";
import logo5 from "@/app/assets/guy1.jpeg";
import { useState } from "react";
import Image from "next/image";
import Styles from "@/app/component/friends/friends.module.css"
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

const Friends = () => {
  const [posts, setPosts] = useState([
    { post: logo1,msg:'600', likes: "500", bookmark: false, reshare: "200" },
    { post: logo2,msg:'600', likes: "300", bookmark: false,  reshare: "200" },
    { post: logo3,msg:'600', likes: "100", bookmark: false, reshare: "200" },
    { post: logo4,msg:'600', likes: "200", bookmark: false, reshare: "200" },
    { post: logo5,msg:'600', likes: "900", bookmark: false, reshare: "200" },
  ]);

  
  
  return (
    <div className={Styles.home}>

      {posts?.map((post) => (
        <div>
          {
            <div className={Styles.post}>
              <Image src={post?.post} width={490} height={600} alt="img" />

              <div className={Styles.icon}>
                <>
                <FaHeart />
                <p>{post.likes}</p>
                </>
                <>
                <MdMessage border/>
                <p>{post.msg}</p>
                </>
                <>
             
                <FaBookmark />
                </>
                <>
                <IoIosShareAlt />
                <p>{post.reshare}</p>
                </>
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default Friends;
