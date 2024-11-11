'use client'
import { useState, useEffect } from 'react'
import logo1 from '../../assets/babe.jpeg'
import logo2 from '../../assets/babe1.jpeg'
import logo3 from '../../assets/bros.jpeg'
import logo4 from '../../assets/dude.jpeg'
import logo5 from '../../assets/guy.jpeg'

const posts = () => {
    const [posts, setPosts] = useState([
        {post:logo1,likes:'200',bookmark:false,reshare:'200'},
        {post:logo2,likes:'200',bookmark:false,reshare:'200'},
        {post:logo3,likes:'200',bookmark:false,reshare:'200'},
        {post:logo4,likes:'200',bookmark:false,reshare:'200'},
        {post:logo5,likes:'200',bookmark:false,reshare:'200'},

    ])
  return (
    <div>
        {posts?.map(post =>(
            <div>{}</div>
        ))}
    </div>
  )
}

export default posts