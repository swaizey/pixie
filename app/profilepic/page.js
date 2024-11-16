'use client'

import React, { useState, useContext,useEffect} from 'react'
import { UserContext } from '@/app/UserContext';
import logo from "@/app/assets/guy1.jpeg";
import Image from 'next/image';
import styles from '@/app/profilepic/profilepic.module.css'
import { useRouter } from 'next/navigation';

const page = () => {
        const router = useRouter()
        const {user, setUser} =useContext(UserContext)
        const [postImage, setPostImage] = useState('');
        const [dataUrl, setDataUrl] = useState()
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)
        const [errorMsg, setErrorMsg] = useState('ghkckbh')

        useEffect(() => {

          // Creating a timeout within the useEffect hook
          setTimeout(() => {
            setError(false)
            setPostImage('')
          }, 3000);
      }, [error]);
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage( base64 );
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        upload()

      };
      const upload = async () => {
        if(postImage ==''){
          return alert('Please select an image')
        }
        setLoading(true)
        const res = await fetch("/api/cloud", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            image: postImage,
          })})
          const data1 = await res.json()
            if(res.ok){
            setDataUrl(data1) 
            const res2 = await fetch(`/api/users/${user?._id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  profilePic: dataUrl?.url,
                })})
                const data = await res2.json()
                if(res2.ok){
                  setUser(data)
                  router.back()
                }else{
                  setError(true)
                  setErrorMsg(data)

                }
              }
              setLoading(false)
            };
         
            
  return (
    //
    <div className={styles.profilePic}>
      {error && <p>{ errorMsg.msg}</p>}
      <div className={styles.pic}>{postImage?.length !== 0  ? <Image src={postImage} width={100} height={100} alt='img'/>:null}</div>
        <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <button style={{background:loading ? 'grey': 'rgb(19, 238, 19)', cursor:loading ? "not-allowed" :"pointer" }} disabled={loading}>Submit</button>
      </form>
      
    </div>
  )
}

export default page