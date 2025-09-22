'use client'

import NewPost from "@/components/posts/newPost"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"

export default function MyPosts () {

  const { dataPosts, loading } = usePostContext()
  const { user } = useAuthContext()
  const userPost = dataPosts.filter(post => post.user.id == user.id)
  const [posts, setPosts] = useState(userPost)

  return (
    <ProtectedRoute>
      <div className="w-full" >
        <NewPost />
        <div>{loading}</div>

        <div>
          {
            dataPosts ?
              <div>
                {
                  posts.map((posts, index) => {
                    return (
                      <div key={index} className="flex flex-col mb-6 w-full p-3.5 rounded-xl border border-gray-400"  >
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