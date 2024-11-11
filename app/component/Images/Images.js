import React from 'react'
import pex1 from '@/app/assets/pex1.jpg'
import pex3 from '@/app/assets/pex3.jpg'
import pex4 from '@/app/assets/pex4.jpg'
import pex5 from '@/app/assets/pex5.jpg'
import pex6 from '@/app/assets/pex6.jpg'
import pex7 from '@/app/assets/pex7.jpg'
import pex8 from '@/app/assets/pex8.jpg'
import pex9 from '@/app/assets/pex9.jpg'
import  pex10 from '@/app/assets/pex10.jpg'
import pex11 from '@/app/assets/pex11.jpg'
import pex12 from '@/app/assets/pex12.jpg'
import pex13 from '@/app/assets/pex13.jpg'
import pex14 from '@/app/assets/pex14.jpg'
import pex15 from '@/app/assets/pex15.jpg'
import pex16 from '@/app/assets/pex16.jpg'
import Image from 'next/image'
import Styles from '@/app/component/Images/imges.module.css'
const page = () => {
    const image =[
       pex1,
       pex3,
       pex4,
       pex5,
       pex6,
       pex7,
       pex8,
       pex9,
       pex10,
       pex11,
       pex12,
       pex13,
        pex14,
       pex15,
       pex16
        ]
  return (
    <div className={Styles.img}>
    <div>{image.map((img=>(
   
        <Image src={img} width={100} height={100} alt='img'/>
        
      )))}</div>
      </div>
  )
}

export default page