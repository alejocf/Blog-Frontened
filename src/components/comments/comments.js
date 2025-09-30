'use client'

import { useAuthContext } from "@/contexts/authContext"
import Image from "next/image"
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react"
import Link from "next/link";
import { usePostContext } from "@/contexts/postContext";

export default function Comments ({ dataComments, setCommentsStatus, postId }) {
  const [commentDescription, setCommentDescription] = useState()
  const [loading, setLoading] = useState('')

  const { token, user } = useAuthContext()
  const { setCommentToEdit, setDataPosts } = usePostContext()

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

      if (response.ok) {
        const newComment = await response.json()
        setDataPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === newComment.post
              ? {
                  ...p,
                  comments: [newComment, ...p.comments]
                }
              : p
          )
        )
        alert('Comment created')

      } else {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        alert("Error to create comment")
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
                        <div className="flex items-center gap-x-2">
                          <Image
                            className="rounded-full"
                            src="/profile-photo.png"
                            alt="Profile Photo"
                            width={20}
                            height={20}
                            />
                          {
                            user.id == comment.user.id ?
                              <>
                                <span className="text-indigo-600 font-semibold" >
                                  You
                                </span>
                                <Link href='/edit-comment/' className="flex items-center gap-x-2" onClick={() => setCommentToEdit(comment)} >
                                  <span>
                                    <FaRegEdit />
                                  </span>
                                  <p className="font-semibold" >Edit</p>
                                </Link>
                              </>
                              : <span>{comment.user.username}</span>
                            }
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