'use client'
import {useState} from "react";
import Styles from "@/app/component/friends/friends.module.css";
import style from "@/app/friends/friends.module.css";
import { LuUserPlus2 } from "react-icons/lu";
import { TiInfoLargeOutline } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDocumentScanner } from "react-icons/md";
import Friends from "../component/friends/Friends";
import Search from '@/app/component/search/search'
const page = () => {
  const [name,setName] = useState('')
  const [opened, setOpened]= useState(false)
  const clicked = ()=>{
    setOpened(true)
  }
  return (
    <div className={style.home}>
      <Search name={name} opened={opened} setOpened={setOpened}/>
      <div className={style.friendNav}>
        <LuUserPlus2 />
        <div className={style.search}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CiSearch />
            <input 
            className="input"
            value={name}
            onFocus={clicked}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Find friends" />
          </div>
      
          <MdOutlineDocumentScanner />
        </div>
        <TiInfoLargeOutline />
      </div>
      <div className={Styles.home}>
        <Friends />
      </div>
    </div>
  );
};

export default page;
