'use client'
import { useState } from "react"

export default function EditProfileView () {
  const [bio, setBio] = useState('')
  const [imageProfile, setImageProfile] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accesToken = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('bio', bio)
    formData.append('profile_photo', imageProfile)



    const post = await fetch('https://blogapi-vuov.onrender.com/api/create-profile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accesToken}`,
      },

      body: formData

    })

    if (post.ok) {
      setMessageStatus('profile edited')
    }
    console.log('finally');

  }

  return (
    <div>
      <div>{messageStatus}</div>
      <form onSubmit={handleSubmit} >

      <label>Profile Image</label>
        <input
          type="file"
          onChange={(e) => setImageProfile(e.target.files[0])}
          // required
        />

        <label>Bio</label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          // required
        />
        <button type="submit" >Edit Profile</button>
      </form>
    </div>
  )
}