'use client'

import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function EditCommet () {
  const [commentDescription, setCommentDescription] = useState('')
  const [post, setPost] = useState([])
  const [comment, setComment] = useState([])
  const [loading, setLoading] = useState(true)
  const [messageStatus, setMessageStatus] = useState('')

  const { commentToEdit, dataPosts } = usePostContext()
  const { token } = useAuthContext()

  useEffect(() => {
    if (commentToEdit) {
      setPost(dataPosts.filter(post => post.id == commentToEdit.post))
      setComment(commentToEdit)
      setCommentDescription(commentToEdit.description)
      setLoading(false)
    }
  }, [commentToEdit])

  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (commentDescription == comment.description) {
      setMessageStatus("* You didn't change any fields")
      return
    }

    if (commentDescription == '') {
      setMessageStatus("* Comment can't be empty")
      return
    }
    setMessageStatus("Loading...")

    const formData = new FormData();
    if (commentDescription) formData.append("description", commentDescription);

    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/comments/${comment.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })

      if (res.ok) {
        setMessageStatus('* Comment edited!')
      } else {
        setMessageStatus('* An error has occurred')
      }

    } catch (error) {
        console.log('error:', error);
        setMessageStatus('API conection error')
    }
  }

  return (
    <div className="w-full" >
      {
        !loading ?
          <>
            <span className="font-semibold" >Post</span>
            <div className="flex flex-col mb-6 w-full p-3.5 rounded-xl border border-gray-400" >
              <div className="mb-2.5" >
                <div className="flex justify-between">
                  <div className="flex flex-nowrap">
                    <p className="font-extrabold" >{post[0].title}</p>
                    <span className="text-gray-500 font-extrabold ml-2.5" >@{post[0].user.username}</span>
                  </div>
                  <p>{post[0].publication_date}</p>
                </div>
                <div>
                  <p>{post[0].description}</p>
                </div>
              </div>
            </div>

            <span className="font-semibold" >Your Comment</span>

            <div className='flex flex-col  w-full p-3.5 rounded-xl border border-indigo-500 bg-indigo-100 mb-6 '>
                <div className="flex items-center gap-x-2">
                  <Image
                    className="rounded-full"
                    src="/profile-photo.png"
                    alt="Profile Photo"
                    width={20}
                    height={20}
                    />

                  <span>
                    You
                  </span>
                </div>

                <p>{comment.description}</p>
            </div>

            <span>{messageStatus}</span>

            <form onSubmit={handleSubmit} className="flex flex-col" >
              <label className="font-semibold">Edit Comment</label>
              <input
                className="border border-indigo-500 rounded-md p-1 mb-2"
                type="text"
                placeholder="Comment"
                value={ commentDescription }
                onChange={(e) => setCommentDescription(e.target.value)}
              />
              <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold">Edit Comment</button>
            </form>
          </>
        : <span>Loading...</span>
      }
    </div>
  )
}