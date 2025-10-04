'use client'

import NewPost from "@/components/posts/newPost"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link"

export default function MyPosts () {

  const { dataPosts, setIdToEditPost } = usePostContext()
  const { user, token } = useAuthContext()

  const [posts, setPosts] = useState([])
  const [postIdToDelete, setPostIdToDelete] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dataPosts && user) {
      setPosts(dataPosts.filter(post => post.user.id === user.id))
    }
  }, [dataPosts, user])

  const show_alert_to_delete_post = async (postId) => {
    setPostIdToDelete(postId)
  }

  const delete_post = async () => {
    if (!postIdToDelete) return
    setLoading(true)
    setMessageStatus('Deleting post...')
    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/posts/${postIdToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (res.ok) {
        setLoading(false)
        setMessageStatus('Post Was Deleted Successfully')
        setPosts(prev => prev.filter(post => post.id !== postIdToDelete))
        setPostIdToDelete(null)
        setTimeout(() => setMessageStatus(''), 5000)
      } else {
        setMessageStatus('An Error Has Occurred')
        setLoading(false)
      }
    } catch (error) {
      console.log('error: ', error);
      setMessageStatus('API Conection Error')
      setLoading(false)
    }
  }


  return (
    <ProtectedRoute>
      <div className="w-full" >
        <h2 className="text-xl font-semibold mb-5" >Your Posts</h2>

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


        <div>
          {
            dataPosts ?
              <div>
                {
                  posts.map((posts, index) => {
                    return (
                      <div key={index} className="flex flex-col mb-6" >
                        <div className="flex items-center gap-3" >
                          <Link href={'/my-posts/edit-post/'} >
                            <span onClick={() => setIdToEditPost(posts.id)} >
                              <FaRegEdit />
                            </span>
                          </Link>

                          <div className={`flex flex-col  w-full p-3.5 rounded-xl border ${ postIdToDelete != posts.id ? 'border-gray-400' : 'border-indigo-500 bg-indigo-100'}`} >
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

                          <span onClick={() => show_alert_to_delete_post(posts.id)} >
                            <FaRegTrashCan />
                          </span>
                        </div>

                        {
                          postIdToDelete == posts.id &&
                            <div className="flex justify-between px-7 items-center" >
                              <span>
                                Are you sure about delete your post?
                              </span>

                              <div className="flex justify-between gap-3 py-2.5" >
                                <button
                                  onClick={delete_post}
                                  disabled={loading}
                                  className="flex justify-center items-center bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 rounded-md"
                                >
                                  {
                                    loading ?
                                      <>
                                        Deleting
                                        <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
                                      </>
                                    : "Yes"
                                  }
                                </button>
                                <button onClick={() => setPostIdToDelete(null)} className="bg-indigo-500 text-white px-3 rounded-md" >
                                  No
                                </button>
                              </div>
                            </div>
                        }
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