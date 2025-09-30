'use client'

import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import Image from "next/image"
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react"

export default function EditCommet () {
  const [commentDescription, setCommentDescription] = useState('')
  const [postWithCommentToEdit, setPostWithCommentToEdit] = useState([])
  const [comment, setComment] = useState([])  // change name to "comment". Name clearer
  const [loading, setLoading] = useState(true)
  const [messageStatus, setMessageStatus] = useState('')
  const [commentAlertToDelete, setCommentAlertToDelete] = useState(false)

  const { commentToEdit, dataPosts, setDataPosts } = usePostContext()
  const { token } = useAuthContext()

  useEffect(() => {
    if (commentToEdit) {
      setPostWithCommentToEdit(dataPosts.filter(post => post.id === commentToEdit.post))
      setComment(commentToEdit)
      setCommentDescription(commentToEdit.description)
      setLoading(false)
    }
  }, [commentToEdit, dataPosts])

  const show_alert_to_delete_comment = () => {
    setCommentAlertToDelete(!commentAlertToDelete)
  }

  const delete_comment = async (e) => {
    e.preventDefault()
    setMessageStatus('Deleting post...')

    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/comments/${comment.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (res.ok) {
        setMessageStatus('Comment was deleted successfully')
        setDataPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postWithCommentToEdit[0].id
              ? {...p, comments: p.comments.filter(c => c.id !== comment.id) }
              : p
          )
        )
      } else {
        setMessageStatus('An error has occurred')
      }

    } catch (error) {
      console.log('error: ', error);
      setMessageStatus('API conection error')
    }
  }

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
        const updatedComment = await res.json()
        setMessageStatus('* Comment edited!')

        setDataPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postWithCommentToEdit[0].id
              ? {...p, comments: p.comments.map(c =>
                c.id === comment.id // change name to "comment". Name clearer
                  ? updatedComment
                  : c
                  )
                }
              : p
          )
        )
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
                    <p className="font-extrabold" >{postWithCommentToEdit[0].title}</p>
                    <span className="text-gray-500 font-extrabold ml-2.5" >@{postWithCommentToEdit[0].user.username}</span>
                  </div>
                  <p>{postWithCommentToEdit[0].publication_date}</p>
                </div>
                <div>
                  <p>{postWithCommentToEdit[0].description}</p>
                </div>
              </div>
            </div>

            <span className="font-semibold" >Your Comment</span>

            <div className={`flex items-center gap-x-3 ${ !commentAlertToDelete ? 'mb-6' : 'mb-0'}`} >
              <div className={`flex flex-col  w-full p-3.5 rounded-xl border ${ !commentAlertToDelete ? 'border-gray-400' : 'border-indigo-500 bg-indigo-100'}`}>
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

              <span onClick={() => show_alert_to_delete_comment()} >
                <FaRegTrashCan />
              </span>
            </div>


            {
              commentAlertToDelete &&

                <div className="flex justify-between items-center mb-6" >
                  <span>
                    Are you sure about delete your comment?
                  </span>

                  <div className="flex justify-between gap-3 py-2.5" >
                    <button onClick={delete_comment} className="bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 rounded-md" >
                      Yes
                    </button>
                    <button onClick={() => setCommentAlertToDelete(false)} className="bg-indigo-500 text-white px-3 rounded-md" >
                      No
                    </button>
                  </div>
                </div>
            }

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