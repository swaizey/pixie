"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UploadWiget = ({galleryImg, setGalleryImg}) => {
  const { data: session } = useSession();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
        uploadPreset: "images",
      },
      function (err, res) {
        if (res.event === "success") {
          const data = res.info;
          setGalleryImg((prev) => [...prev, data]);
        }
      }
    );
  }, []);
  const removePx =(img)=>{
    const newUrl = galleryImg.filter(id => id !== img )
    setGalleryImg(newUrl)
  
  } 

  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Gallary</button>
      {galleryImg?.map((i) => (
        <>
          <Image style={{marginRight:'5px'}} src={i?.secure_url} height={70} width={70} alt="img" />

          <button onClick={(e)=> removePx(i)}>X</button>
        </>
      ))}
    </div>
  );
};

export default UploadWiget;
