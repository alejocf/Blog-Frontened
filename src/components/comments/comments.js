'use client'

import { useAuthContext } from "@/contexts/authContext"
import Image from "next/image"
import { useState } from "react"

export default function Comments ({ dataComments, setCommentsStatus, postId }) {
  const [commentDescription, setCommentDescription] = useState()
  const [loading, setLoading] = useState('')

  const { token, user } = useAuthContext()

  const handleSubmit = async (e) => {
    setLoading("Loading...");
    e.preventDefault()

    const formData = new FormData()
    formData.append('post', postId)
    formData.append('description', commentDescription)

    try {
      const response = await fetch('https://blogapi-vuov.onrender.com/api/my-comments/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        alert("Error to create comment")
      } else {
        alert('Comment created')
      }

    } catch (error) {
      console.error("Request failed:", error);
      alert("Error de red");
    } finally {
      setLoading("");
    }
  }


  const closeComments = () => {
    setCommentsStatus(false)
  }

  return (
    <div>
      <span className="font-bold text" >Comments</span>

      <div>
        {
          dataComments.length > 0 ?
            <div>
              <span>{loading}</span>

              <div>
                {
                  dataComments.map((comment, index) => {
                    return (
                      <div key={index} className="mb-4">
                        <div className="flex items-center">
                          <Image
                            className="rounded-full mr-2"
                            src="/profile-photo.png"
                            alt="Profile Photo"
                            width={20}
                            height={20}
                            />
                          <span>{comment.user.username}</span>
                        </div>
                        <p>{comment.description}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          : <span className="text-gray-600" >Be the first to comment !</span>
        }
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-400 rounded-md p-1 w-full mb-2.5"
          type="text"
          placeholder="Write a comment..."
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <div className="flex justify-end" >
          <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold" >
            Comment
          </button>
        </div>
      </form>

      <div className="-mt-8" >
        <span onClick={closeComments} >
          <button>Close Coments</button>
        </span>
      </div>
    </div>
  )
}