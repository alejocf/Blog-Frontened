'use client'
import { useState } from "react";
import Comments from "./comments";
import { FaRegComment } from "react-icons/fa";

export default function Main () {
  const [dataPosts, setDataPosts] = useState([])
  const [dataStatus, setDataStatus] = useState(false)
  const [commentsStatus, setCommentsStatus] = useState(false)
  const [dataComments, setDataComments] = useState(null)

  const get_posts = async () => {
    const dataAPI = await fetch('https://blogapi-vuov.onrender.com/api/posts/')
      .then((request) => request.json())
      .then((data) => {
        setDataPosts([data])
        setDataStatus(true)
        // console.log('dataposts: ', dataPosts);
        // console.log('data post [0]', dataPosts[0]);
        // console.log('comments:', dataPosts[0][0].comments);
      })
    }


  const showComments = (comments) => {
    setCommentsStatus(true)
    setDataComments(comments)
  }


  return (
    <main className="row-start-2 col-start-2 flex" >
      <div className="w-full">
        {
          dataStatus?
            <div>
              {
                dataPosts[0].map((posts) => {
                  return (
                    <div key={posts.id} className="flex flex-col mb-10 w-full" >
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
                        <span onClick={() => showComments(posts.comments)} >
                          <button>
                            <FaRegComment />
                          </button>
                        </span>
                      </div>
                    </div>
                  )
                } )
              }

              <div>
                {
                  commentsStatus &&
                    <Comments dataComments={dataComments} setCommentsStatus={setCommentsStatus} />
                }
              </div>

            </div>

          : <p>There is not any post</p>
        }
        <button onClick={get_posts}>show data</button>
      </div>
    </main>
  )
}

