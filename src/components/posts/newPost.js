'use client'
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
export default function NewPost () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const { token } = useAuthContext()
  const { dataPosts, setDataPosts } = usePostContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
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
        setTitle('')
        setDescription('')
        setLoading(false)
        setMessageStatus('Post created successfully')
        setTimeout(() => setMessageStatus(''), 5000)
      }

      else {
        setMessageStatus('Error Creating Post')
      }
    }

    catch (error) {
      setMessageStatus('API Conection Error')
    }
  }

  return (
    <div className="mb-8" >

      {messageStatus && (
        <div
          className={`flex justify-between items-center mb-4 p-3 rounded-md text-sm font-medium
            ${messageStatus.includes("successfully")
              ? "bg-green-100 text-green-700 border border-green-300"
              : messageStatus.includes("Error")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
        >
          {messageStatus}
          {
            messageStatus.includes('successfully') &&
              <FaCheckCircle className="text-lg" />
          }
        </div>
      )}

      <h2 className="text-xl font-semibold mb-5" >Create a new Post</h2>

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
          <button
            type="submit"
            className="flex items-center justify-center bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold"
            disabled={loading}
          >
            {
              loading ?
                <>
                  Creating Post
                  <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </>
              : 'Create Post'
            }
          </button>

        </span>
      </form>
    </div>
  )
}