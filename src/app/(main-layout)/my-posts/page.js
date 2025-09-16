'use client'

import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useState } from "react"

export default function MyPosts () {
  const [dataPosts, setDataPosts] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  // const [token, setToken] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [Loading, setLoading] = useState('')

  // setToken(localStorage.getItem('token'))
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  useEffect(() => {
    if (!token) {
      return <p>You're not login</p>
    }
    setLoading('Loading...')
    const get_my_posts = async () => {
      const dataAPI = await fetch('https://blogapi-vuov.onrender.com/api/my-posts/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })


      if (dataAPI.ok) {
        const data = await dataAPI.json()
        setDataPosts(data)
        setLoading('')
      }

      if (dataPosts == []) {
        setLoading("You don't have any posts yet")
      }

    }
    get_my_posts()
  }, [token])




  const create_post = async (e) => {
    e.preventDefault()

    try {
      const post = await fetch('https://blogapi-vuov.onrender.com/api/my-posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title: title,
          description: description
        })
      })

      if (post.ok) {
        const newPost = await post.json()
        setDataPosts([...dataPosts, newPost])
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


  // if (loadingStatus) return <p>Loading...</p>
  // if (!token) return <p>Please sig in</p>


  return (
    <ProtectedRoute>
      <div>
        <div>
          <h2>Create a new Post</h2>

          <form onSubmit={create_post} >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Create post</button>
          </form>
        </div>

        <div>{Loading}</div>

        <div>
          {
            dataPosts ?
              <div>
                {
                  dataPosts.map((posts, index) => {
                    return (
                      <div key={index} >
                      <p>{posts.description}</p>
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