'use client'

import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"

export default function MyPosts () {

  const { dataPosts, loading } = usePostContext()
  const { user, token } = useAuthContext()

  const userPost = dataPosts.filter(post => post.user.id == user.id)

  console.log('user post: ', userPost);

  const [posts, setPosts] = useState(userPost)


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const create_post = async (e) => {
    e.preventDefault()
    setMessageStatus('Loading post creation')

    try {
      const post = await fetch('https://blogapi-vuov.onrender.com/api/my-posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
          title: title,
          description: description
        })
      })

      if (post.ok) {
        const newPost = await post.json()
        setPosts([...userPost, newPost])
        setMessageStatus('Post created succesfully')
        setTitle('')
        setDescription('')
      }

      else {
        setMessageStatus('Invalid Credentials, Try again !!')
      }

    }

    catch (error) {
      setMessageStatus('API conection error')
      setTitle('')
      setDescription('')
    }
  }


  return (
    <ProtectedRoute>
      <div className="w-full" >
        <div className="mb-8" >
          <h2 className="text-xl font-semibold mb-5" >Create a new Post</h2>
          <p>{messageStatus}</p>
          <form onSubmit={create_post} className="flex flex-col" >
            <label className="text-lg" >
              Title
            </label>
            <input
              className="border border-indigo-500 rounded-md p-1 mb-2"
              type="text"
              placeholder="New post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            />

            <span className="flex justify-end" >
              <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold" >Create post</button>
            </span>
          </form>
        </div>

        <div>{loading}</div>

        <div>
          {
            dataPosts ?
              <div>
                {
                  posts.map((posts, index) => {
                    return (
                      <div key={index} className="flex flex-col mb-6 w-full p-3.5 rounded-xl border border-gray-400"  >
                        <div className="flex justify-between">
                          <div className="flex flex-nowrap">
                            <p className="font-extrabold" >{posts.title}</p>
                            <span className="text-gray-500 font-extrabold ml-2.5" >@{posts.user.username}</span>
                          </div>
                          <p>{posts.publication_date}</p>
                        </div>
                        <div>
                          <p>{posts.description}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            :
            <div>
              You don't have any posts
            </div>
          }
        </div>
      </div>
    </ProtectedRoute>
  )
}