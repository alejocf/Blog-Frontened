'use client'
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Comments from "../comments/comments";

export default function Main () {
  const [dataPosts, setDataPosts] = useState([])
  const [dataStatus, setDataStatus] = useState(false)
  const [commentsStatus, setCommentsStatus] = useState(false)
  const [dataComments, setDataComments] = useState(null)
  const [loading, setLoading] = useState('Loading...')

  const [postId, setPostId] = useState(null)

  const get_posts = async () => {

    const dataAPI = await fetch('https://blogapi-vuov.onrender.com/api/posts/')
      .then((request) => request.json())
      .then((data) => {
        setDataPosts([data])
        setDataStatus(true)
        setLoading('')
      })

  }


  const showComments = (comments, postId) => {
    setCommentsStatus(!commentsStatus)
    setDataComments(comments)
    setPostId(postId)
  }

  get_posts()

  return (
    <main className="row-start-2 col-start-2 shadow-2xl flex rounded-3xl p-3.5" >
      <div>{loading}</div>
      <div className="w-full">
        {
          dataStatus &&
            <div>
              {
                dataPosts[0].map((posts) => {
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

        }
      </div>


    </main>
  )
}

