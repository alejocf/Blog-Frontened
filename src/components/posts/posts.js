'use client'
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Comments from "../comments/comments";
import { usePostContext } from "@/contexts/postContext";

export default function Posts () {
  const { dataPosts, loading } = usePostContext()

  const [commentsStatus, setCommentsStatus] = useState(false)
  const [dataComments, setDataComments] = useState(null)
  const [postId, setPostId] = useState(null)

  const showComments = (comments, postId) => {
    setCommentsStatus(!commentsStatus)
    setDataComments(comments)
    setPostId(postId)
  }

  return (
    <div className="w-full">
      <span>{loading}</span>
      <div>
        {
          dataPosts.map((posts) => {
            return (
              <div key={posts.id} className="flex flex-col mb-6 w-full p-3.5 rounded-xl border border-gray-400" >
                <div>
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

                <div>
                  <span onClick={() => showComments(posts.comments, posts.id)} >
                    <button>
                      <FaRegComment />
                    </button>
                  </span>
                </div>

                <div>
                  {
                    postId == posts.id && commentsStatus ?
                      <Comments dataComments={dataComments} setCommentsStatus={setCommentsStatus} postId={postId}/>
                    : null
                  }
                </div>
              </div>
            )
          } )
        }
      </div>
    </div>
  )
}

