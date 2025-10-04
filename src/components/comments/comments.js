'use client'

import { useAuthContext } from "@/contexts/authContext"
import Image from "next/image"
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react"
import Link from "next/link";
import { usePostContext } from "@/contexts/postContext";

export default function Comments ({ dataComments, setCommentsStatus, postId }) {
  const [commentDescription, setCommentDescription] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const { token, user } = useAuthContext()
  const { setCommentToEdit, setDataPosts } = usePostContext('')

  const handleSubmit = async (e) => {
    setLoading(true)
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
        setLoading(false)
        setMessageStatus('Comment Created Successfully')
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
        setTimeout(() => setMessageStatus(''), 5000)

      } else {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        setMessageStatus('Error to create comment')
      }

    } catch (error) {
      console.error("Request failed:", error);
      setMessageStatus('API Connection Error')
    } finally {
      setLoading(false);
    }
  }

  const closeComments = () => {
    setCommentsStatus(false)
  }

  return (
    <div>

      {messageStatus && (
        <div className="fixed bottom-5 right-5 z-50 animate-fadeIn">
          <div className={`px-4 py-2 rounded-lg shadow-lg text-white font-bold
            ${messageStatus.includes("Successfully")
              ? "bg-green-600"
              : messageStatus.includes("Error")
              ? "bg-red-600"
              : "bg-indigo-600"
            }`}
          >
            {messageStatus}
          </div>
        </div>
      )}
      <span className="font-bold text" >Comments</span>

      <div>
        {
          dataComments.length > 0 ?
            <div>

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
          <button
            type="submit"
            className="flex items-center justify-between bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold"
            disabled={loading}
          >
            {
              loading ?
              <>
                Commenting
                <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </>
              : 'Comment'
            }

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