'use client'
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"

export default function EditPost () {

  const [postToEdit, setPostToEdit] = useState([])
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')

  const { dataPosts, setDataPosts, idToEditPost } = usePostContext()
  const { token } = useAuthContext()

  useEffect(() => {
    if (idToEditPost) {
      setPostToEdit(dataPosts.filter(post => post.id == idToEditPost))
      setTitle(dataPosts.filter(post => post.id == idToEditPost)[0].title)
      setDescription(dataPosts.filter(post => post.id == idToEditPost)[0].description)
    }
  }, [idToEditPost])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (title == postToEdit[0].title && description == postToEdit[0].description) {
      setMessageStatus("* You didn't change any fields")
      return
    }

    if (title == '' || description == '') {
      setMessageStatus("* Post's fields can't be empty")
      return
    }
    setMessageStatus("Loading...")

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);


    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/posts/${idToEditPost}/`, {
        method: 'PATCH',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })

      if (res.ok) {
        const updatedPost = await res.json()
        setDataPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === idToEditPost ? { ...post, ...updatedPost } : post
          )
        )
        setMessageStatus('Post edited successfull')
      } else {
        setMessageStatus('An error has occurred')
      }
    } catch (error) {
      console.log('error: ', error);
      setMessageStatus('API conection error')
    }

  }

  return (
    <div className="w-full" >
      <h2>
        Edit your post here
      </h2>

      <span>{messageStatus}</span>
      {
        postToEdit[0] && title ?
        <div>

          <div className={'flex flex-col p-3.5 rounded-xl border border-gray-400'} >
            <div className="flex justify-between">
              <div className="flex flex-nowrap">
                <p className="font-extrabold" >{postToEdit[0].title}</p>
                <span className="text-gray-500 font-extrabold ml-2.5" >@{postToEdit[0].user.username}</span>
              </div>
              <p>{postToEdit[0].publication_date}</p>
            </div>
            <div>
              <p>{postToEdit[0].description}</p>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="flex flex-col" >
            <label>Title</label>
            <input
              className="border border-indigo-500 rounded-md p-1 mb-2"
              type="text"
              placeholder="Title"
              value={ title }
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>
            <input
              className="border border-indigo-500 rounded-md p-1 mb-2"
              type="text"
              placeholder="Description"
              value={ description }
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold">Edit Profile</button>
          </form>
        </div>

        : <span>Loading...</span>
      }




    </div>
  )
}