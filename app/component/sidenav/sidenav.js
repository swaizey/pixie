import React from "react";
import { CiHeart } from "react-icons/ci";
import { TiMessageTyping } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import Style from '@/app/component/sidenav/sidenav.module.css'
const Sidenav = ({likes, bookmark,reshare}) => {


 
  return (
    <div className={Style.sidenav}>
      <FaHeart />
      
      {likes}
      <TiMessageTyping />

      <CiBookmark />
      {bookmark}
      <IoIosShareAlt />
      {reshare}
    
    </div>
  );
};

export default Sidenav;
