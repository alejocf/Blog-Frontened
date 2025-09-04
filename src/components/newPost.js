'use client'
import { Content } from "next/font/google"
import { useEffect, useState } from "react"

export default function NewPost () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const handleSubmit = async (e) => {

    const accesToken = localStorage.getItem('token')
    console.log('acces token:', accesToken);

    e.preventDefault()

    try {
      const post = await fetch('https://blogapi-vuov.onrender.com/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesToken}`,
        },

        body: JSON.stringify({
          'title': title,
          'description': description
        })
      })

      if (post.ok) {
        setMessageStatus('Post created succesfull')
        setTitle('')
        setDescription('')
      }

      else {
        setMessageStatus('Error creating post')
      }
    }

    catch (error) {
      setMessageStatus('API conection error')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" >Create Post</button>
      </form>

      <span>{messageStatus}</span>
    </div>
  )
}