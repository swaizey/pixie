'use client'

import { MdConnectedTv } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Style from '@/app/component/navbar/navbar.module.css'

const Navbar = () => {

  return (
    <div className={Style.nav}>
      <MdConnectedTv />
      <div style={{display:"flex",flexDirection:"row"}}>
      <p style={{marginRight:"10px"}}>Following</p>
      <p>For You</p>
      </div>
      <FaSearch />
    </div>
  );
};

export default Navbar;
