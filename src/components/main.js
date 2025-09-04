'use client'
import { useState } from "react";
import Comments from "./comments";
import NewPost from "./newPost";

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
    <main className="row-start-2 col-start-2 flex justify-center bg-emerald-800" >
      <div>
        {
          dataStatus?
            <div>
              {
                dataPosts[0].map((posts) => {
                  return (
                    <div key={posts.id} className="flex flex-col bg-blue-500 m-2" >
                      <div>
                        <div className="flex justify-between">
                          <span>{posts.user.username}</span>
                          <p>{posts.publication_date}</p>
                        </div>
                        <div>
                          <p>{posts.title}</p>
                          <p>{posts.description}</p>
                        </div>
                      </div>

                      <div>
                        <span onClick={() => showComments(posts.comments)} >
                          <button>Coments</button>
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

