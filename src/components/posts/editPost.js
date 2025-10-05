'use client'
import { useAuthContext } from "@/contexts/authContext"
import { usePostContext } from "@/contexts/postContext"
import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";

export default function EditPost () {

  const [postToEdit, setPostToEdit] = useState([])
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

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

    setLoading(true)

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
        setLoading(false)
        setMessageStatus('Post Edited Successfully')
        setDataPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === idToEditPost ? { ...post, ...updatedPost } : post
          )
        )
        setTimeout(() => setMessageStatus(''), 5000)

      } else {
        setMessageStatus('An Error Has Occurred')
        setLoading(false)
      }
    } catch (error) {
      console.log('error: ', error);
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

      <h2 className="text-xl font-semibold mb-5" >
        Edit your post here
      </h2>

      <span>{messageStatus}</span>
      {
        postToEdit[0] && title ?
        <div>

          <div className='flex flex-col p-3.5 rounded-xl border border-gray-400 mb-10' >
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
            <label className="font-semibold" >Title</label>
            <input
              className="border border-indigo-500 rounded-md p-1 mb-2"
              type="text"
              placeholder="Title"
              value={ title }
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="font-semibold" >Description</label>
            <input
              className="border border-indigo-500 rounded-md p-1 mb-6"
              type="text"
              placeholder="Description"
              value={ description }
              onChange={(e) => setDescription(e.target.value)}
            />

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center w-full bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold"
              >
                {
                  loading ?
                    <>
                      Editing Post
                      <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  : 'Edit Post'
                  }
                </button>
              </div>
          </form>
        </div>

        : <span>Loading...</span>
      }
    </div>
  )
}