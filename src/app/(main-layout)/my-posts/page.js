'use client'

import NewPost from "@/components/posts/newPost"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link"

export default function MyPosts () {

  const { dataPosts, loading, setIdToEditPost } = usePostContext()
  const { user, token } = useAuthContext()

  const [posts, setPosts] = useState([])
  const [postIdToDelete, setPostIdToDelete] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')

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

    setMessageStatus('Deleting post...')
    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/posts/${postIdToDelete}/`, {
        method: 'DELETE',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      if (res.ok) {
        setMessageStatus('Post was deleted successful')
        setPosts(prev => prev.filter(post => post.id !== postIdToDelete))
        setPostIdToDelete(null)
      } else {
        setMessageStatus('An error has occurred')
      }
    } catch (error) {
      console.log('error: ', error);

      setMessageStatus('API conection error')
    }
  }


  return (
    <ProtectedRoute>
      <div className="w-full" >
        <NewPost />
        <h2 className="text-xl font-semibold mb-5" >Your Posts</h2>
        <span>{loading}</span>
        <span>{messageStatus}</span>
        <div>
          {
            dataPosts ?
              <div>
                {
                  posts.map((posts, index) => {
                    return (
                      // <div className="flex flex-col items-center mb-6 gap-3" >
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
                                <button onClick={delete_post} className="bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 rounded-md" >
                                  Yes
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