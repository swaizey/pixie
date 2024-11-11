'use client'
import Styles from "./page.module.css";
import Navbar from "./component/navbar/navbar";
import Sidenav from "./component/sidenav/sidenav";
import { useSession } from "next-auth/react";
import Homes from "./home/home";

export default function Home() {
  const {data:sesison} = useSession()


  return (
  <div className={Styles.home}>
    <Navbar />
    <Homes/>
    </div>
  
  );
}
