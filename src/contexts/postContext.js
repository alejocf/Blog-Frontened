'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const PostContext = createContext()

export function PostProvider ({ children }) {
  const [dataPosts, setDataPosts] = useState([])
  const [loading, setLoading] = useState('Loading...')

  useEffect(() => {
    const get_posts = async () => {
      const res = await fetch('https://blogapi-vuov.onrender.com/api/posts/')
      const data = await res.json()
      setDataPosts(data)
      setLoading('')
    }
    get_posts()
  }, [])

  return (
    <PostContext.Provider value={{ dataPosts, setDataPosts, loading }} >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext () {
  return useContext(PostContext)
}
