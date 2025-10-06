'use client'

import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import Image from "next/image"
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import API from "@/config/api";

export default function EditCommet () {
  const [commentDescription, setCommentDescription] = useState('')
  const [postWithCommentToEdit, setPostWithCommentToEdit] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageStatus, setMessageStatus] = useState('')
  const [commentAlertToDelete, setCommentAlertToDelete] = useState(false)
  const [loadingDeleteComment, setLoadingDeleteComment] = useState(false)

  const { commentToEdit, dataPosts, setDataPosts } = usePostContext()
  const { token } = useAuthContext()



  console.log(commentToEdit);




  useEffect(() => {
    if (commentToEdit) {
      setPostWithCommentToEdit(dataPosts.filter(post => post.id === commentToEdit.post))
      setCommentDescription(commentToEdit.description)
    }
  }, [commentToEdit, dataPosts])

  const show_alert_to_delete_comment = () => {
    setCommentAlertToDelete(!commentAlertToDelete)
  }

  const delete_comment = async (e) => {
    e.preventDefault()
    setLoadingDeleteComment(true)


    try {
      const res = await fetch(`${API.COMMENTS}${commentToEdit.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (res.ok) {
        setLoadingDeleteComment(false)
        setMessageStatus('Comment Was Deleted Successfully')
        setDataPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postWithCommentToEdit[0].id
              ? {...p, comments: p.comments.filter(c => c.id !== commentToEdit.id) }
              : p
          )
        )
      } else {
        setLoadingDeleteComment(false)
        setMessageStatus('An Error Has Occurred')
      }

    } catch (error) {
      console.log('error: ', error);
      setLoadingDeleteComment(false)
      setMessageStatus('API Conection Error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (commentDescription == commentToEdit.description) {
      setMessageStatus("* You didn't change any fields")
      return
    }

    if (commentDescription == '') {
      setMessageStatus("* Comment can't be empty")
      return
    }
    setLoading(true)

    const formData = new FormData();
    if (commentDescription) formData.append("description", commentDescription);

    try {
      const res = await fetch(`${API.COMMENTS}${commentToEdit.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })

      if (res.ok) {
        const updatedComment = await res.json()
        setLoading(false)
        setMessageStatus('Comment Edited Successfully')

        setDataPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postWithCommentToEdit[0].id
              ? {...p, comments: p.comments.map(c =>
                c.id === commentToEdit.id
                  ? updatedComment
                  : c
                  )
                }
              : p
          )
        )
      } else {
        setLoading(false)
        setMessageStatus('An Error Has Occurred')
      }

    } catch (error) {
        console.log('error:', error);
        setLoading(false)
        setMessageStatus('API Conection Error')
    }
  }

  return (
    <div className="w-full" >
      {messageStatus && (
        <div
          className={`flex justify-between items-center mb-4 p-3 rounded-md text-sm font-medium
            ${messageStatus.includes("Successfully")
              ? "bg-green-100 text-green-700 border border-green-300"
              : messageStatus.includes("Error")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
        >
          {messageStatus}
          {
            messageStatus.includes('Successfully') &&
              <FaCheckCircle className="text-lg" />
          }
        </div>
      )}


          {
            postWithCommentToEdit[0] ?
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
              </>
              : <div className="flex items-center justify-center h-screen">
                  <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>


          }

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

                  <p>{commentToEdit.description}</p>
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
                    <button
                      onClick={delete_comment}
                      disabled={loadingDeleteComment}
                      className="flex justify-center items-center bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 rounded-md"
                    >
                      {
                        loadingDeleteComment ?
                          <>
                            Deleteing
                            <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
                          </>
                         : 'Yes'
                      }
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
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold"
              >
                {
                  loading ?
                    <>
                      Editing Comment
                      <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                    : 'Edit Comment'
                }
              </button>
            </form>
    </div>
  )
}