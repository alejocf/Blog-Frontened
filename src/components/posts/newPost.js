'use client'
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useState } from "react"

export default function NewPost () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const { token } = useAuthContext()
  const { dataPosts, setDataPosts } = usePostContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessageStatus('Loading post creation...')

    try {
      const post = await fetch('https://blogapi-vuov.onrender.com/api/my-posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          'title': title,
          'description': description
        })
      })

      if (post.ok) {
        const newPost = await post.json()
        setDataPosts(prevPosts => [...prevPosts, newPost])
        setMessageStatus('Post created succesfully')
        setTitle('')
        setDescription('')
        setTimeout(() => setMessageStatus(''), 3000)
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
    <div className="mb-8" >
      <h2 className="text-xl font-semibold mb-5" >Create a new Post</h2>
      <p>{messageStatus}</p>
      <form onSubmit={handleSubmit} className="flex flex-col" >
        <label className="text-lg" >
          Title
        </label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="text"
          placeholder="New post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="text-lg" >
          Description
        </label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="text"
          placeholder="This is my new post"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <span className="flex justify-end" >
          <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold" >Create post</button>
        </span>
      </form>
    </div>
  )
}