'use client'

import { useAuthContext } from "@/contexts/authContext"
import { useState } from "react"

export default function Comments ({ dataComments, setCommentsStatus, postId }) {
  const [commentDescription, setCommentDescription] = useState()
  const [loading, setLoading] = useState('')
  // console.log('post id from comment component:', postId);

  const { token, user } = useAuthContext()

  // console.log('user from comment component:', user);




  const handleSubmit = async (e) => {
    setLoading("Loading...");
    e.preventDefault()

    const formData = new FormData()
    formData.append('post', postId)
    formData.append('description', commentDescription)
    // formData.append('user', user)

    console.log(formData);


    try {
      const response = await fetch('https://blogapi-vuov.onrender.com/api/my-comments/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        alert("Error to create comment")
      } else {
        alert('Comment created')
      }

    } catch (error) {
      console.error("Request failed:", error);
      alert("Error de red");
    } finally {
      setLoading("");
    }
  }


  const closeComments = () => {
    setCommentsStatus(false)
  }

  return (
    <div>
      <span>{loading}</span>

      <div>
        {
          dataComments.map((comment, index) => {
            return (
              <div key={index} >
                {comment.description}
              </div>
            )
            }
          )
        }
      </div>

      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <input
          type="text"
          placeholder="Comment"
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <button type="submit">
          Create Comment
        </button>
      </form>
      <div>
        <span onClick={closeComments} >
          <button>Close Coments</button>
        </span>
      </div>
    </div>

  )
}