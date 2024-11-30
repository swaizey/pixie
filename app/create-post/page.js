"use client";
import Image from "next/image";
import { useState, useRef, useEffect,useContext } from "react";
import UploadWiget from "../component/uploadWiget";
import Webcam from "react-webcam";
import { Cloudinary } from "@cloudinary/url-gen";
import Styles from "@/app/create-post/post.module.css";
import { useSession } from "next-auth/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { TiArrowBackOutline } from "react-icons/ti";
import { UserContext } from '@/app/UserContext'
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

const page = () => {
    const { data: session } = useSession();
  const router = useRouter()
  if(!session){
    router.push('/login')
  }
  const [screenshot, setScreenshot] = useState();
  const [cldData, setCldData] = useState();
  const [filter, setFilter] = useState();
  const [post, setPost] =useState('')
  const [galleryImg, setGalleryImg] =useState([])
  const webcamRef = useRef();
  const {user, setUser} = useContext(UserContext)
  const gallery = galleryImg?.map(g => g.url)
  
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
    url: {
      secure: true,
    },
  });
  const cloudImg = cldData?.public_id && cld.image(cldData?.public_id);
  if (cloudImg && filter) {
    cloudImg.effect(`e_art:${filter}`);
  }

  const src = cloudImg?.toURL() || screenshot;
  useEffect(() => {
    if (!screenshot) return;
    const upload = async () => {
      const res = await fetch("/api/cloud", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          image: screenshot,
        }),
      });
      const data = await res.json();
      setCldData(data);
    
    };
    upload();
  }, [screenshot]);

  const artfilter = [
    "al_dente",
    "athena",
    "audrey",
    "aurora",
    "daguerre",
    "eucalyptus",
    "fes",
    "frost",
    "hairspray",
    "hokusai",
    "incognito",
    "linen,",
    "peacock",
    "primavera",
    "quartz",
    "red_rock",
    "refresh",
    "sizzle",
    "sonnet",
    "ukulele",
    "zorro",
  ];

  const getImg = () => {
    const img = webcamRef.current.getScreenshot();
    setScreenshot(img);
  };
  const reset = () => {
    setScreenshot("");
    setCldData("");
  };
  const picToUpLoad = [src, ...gallery]
  const handleSubmit= async(e)=>{
    e.preventDefault()

    const res = await fetch('/api/posts',
     { method:'POST',
        body:JSON.stringify({
          post:post,
          img:picToUpLoad,
          posterId:user?._id
        })
     })
     const data =await res.json()
     if(res.ok){
      router.push('/')
     }
  }
  const videoConstraints = {
      facingMode: "user"
    };
  return (
    <div>
      {src && <img src={src} />}
      {!src && (
        <div className={Styles.cam}>
          <Webcam mirrored={true} videoConstraints={videoConstraints} ref={webcamRef}
             style={{
            
                textAlign: "center",
                zindex: 8,
                right:0,
                height: "80vh",
                 width: "100%",
                 objectFit: "fill",
              }}
          />
        </div>
      )}

      {!src && (

         <div className={Styles.photo}>
          <div onClick={getImg} className={Styles.circle}></div>
          <div className={Styles.ring}></div>
          </div>
      )}
      {src && (
        <button className={Styles.re}>
          <TiArrowBackOutline onClick={reset} />
        </button>
      )}
      {src && (
        <Swiper
          slidesPerView={7}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {artfilter.map((filt, i) => (
            <SwiperSlide key={i}>
              <button key={filt} onClick={() => setFilter(filt)}>
                <Image
                  width={50}
                  height={50}
                  alt="img"
                  src={cld
                    ?.image(
                      "Bear-Hat-Mountain-Hidden-Lake-Montana-Glacier_kst09b"
                    )
                    .resize("w_200,h_200")
                    .effect(`e_art:${filt}`)
                    .toURL()}
                />
                <p>{filt}</p>
               
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <form onSubmit={handleSubmit}>
        <input
          value={post}
          onChange={(e)=>setPost(e.target.value)}
          placeholder="Say something"
          />
          <button>Submit</button>
      </form>
      <UploadWiget galleryImg={galleryImg} setGalleryImg={setGalleryImg} />
    </div>
  );
};

export default page;
