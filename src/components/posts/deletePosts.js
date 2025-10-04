'use client'
import { useAuthContext } from "@/contexts/authContext"
import { useState } from "react"

export default function DeletePost ({ setMessageStatus, postIdToDelete, setPostIdToDelete, setPosts }) {

  const [loading, setLoading] = useState(false)

  const { token } = useAuthContext()

  const delete_post = async () => {
    if (!postIdToDelete) return
    setLoading(true)
    setMessageStatus('Deleting post...')
    try {
      const res = await fetch(`https://blogapi-vuov.onrender.com/api/posts/${postIdToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (res.ok) {
        setLoading(false)
        setMessageStatus('Post Was Deleted Successfully')
        setPosts(prev => prev.filter(post => post.id !== postIdToDelete))
        setPostIdToDelete(null)
        setTimeout(() => setMessageStatus(''), 5000)
      } else {
        setMessageStatus('An Error Has Occurred')
        setLoading(false)
      }
    } catch (error) {
      console.log('error: ', error);
      setMessageStatus('API Conection Error')
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-between px-7 items-center" >
      <span>
        Are you sure about delete your post?
      </span>

      <div className="flex justify-between gap-3 py-2.5" >
        <button
          onClick={delete_post}
          disabled={loading}
          className="flex justify-center items-center bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 rounded-md"
        >
          {
            loading ?
              <>
                Deleting
                <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </>
            : "Yes"
          }
        </button>
        <button onClick={() => setPostIdToDelete(null)} className="bg-indigo-500 text-white px-3 rounded-md" >
          No
        </button>
      </div>
    </div>
  )
}