'use client'

import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link"
import DeletePost from "@/components/posts/deletePost"

export default function PersonalPosts () {

  const { dataPosts, setIdToEditPost } = usePostContext()
  const { user } = useAuthContext()

  const [posts, setPosts] = useState([])
  const [postIdToDelete, setPostIdToDelete] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')

  console.log('my-post:,', posts);

  useEffect(() => {
    if (dataPosts && user) {
      setPosts(dataPosts.filter(post => post.user.id === user.id))
    }
  }, [dataPosts, user])

  const show_alert_to_delete_post = async (postId) => {
    setPostIdToDelete(postId)
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
            posts.length > 0 ?
              <div>
                {
                  posts.map((posts, index) => {
                    return (
                      <div key={index} className="flex flex-col mb-6 h-screen" >
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
                            <DeletePost setMessageStatus={setMessageStatus} postIdToDelete={postIdToDelete} setPostIdToDelete={setPostIdToDelete} setPosts={setPosts} />
                        }
                      </div>
                    )
                  })
                }
              </div>
            :
            <div className="h-screen" >
              You don&apos;t have any posts
            </div>
          }
        </div>
      </div>
    </ProtectedRoute>
  )
}