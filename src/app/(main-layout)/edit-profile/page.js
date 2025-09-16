'use client'
import { useState } from "react"

export default function EditProfileView () {
  const [imageProfile, setImageProfile] = useState(null)
  const [bio, setBio] = useState('')
  const [instagramAccount, setInstagramAccount] = useState('')
  const [birthday, setBirthday] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");

    const accesToken = localStorage.getItem("token");

    const formData = new FormData();
    if (imageProfile) formData.append("profile_photo", imageProfile);
    formData.append("bio", bio);
    formData.append("instagram", instagramAccount);
    formData.append("birthday", birthday);

    try {
      const response = await fetch(
        "https://blogapi-vuov.onrender.com/api/edit-profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accesToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setMessageStatus("Error al editar el perfil");
      } else {
        setMessageStatus("Profile edited!");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setMessageStatus("Error de red");
    } finally {
      setLoading("");
    }
  };


  // const handleSubmit = async (e) => {
  //   setLoading('Loading...')
  //   e.preventDefault()

  //   const accesToken = localStorage.getItem('token')

  //   const formData = new FormData()
  //   formData.append('profile_photo', imageProfile)
  //   formData.append('bio', bio)
  //   formData.append('instagram', instagramAccount)
  //   formData.append('birthday', birthday)

  //   const post = await fetch('https://blogapi-vuov.onrender.com/api/edit-profile/', {
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Bearer ${accesToken}`,
  //     },

  //     body: formData

  //   })

  //   if (post.ok) {
  //     setMessageStatus('profile edited')
  //     setLoading('')
  //   }
  //   console.log('finally');

  // }

  return (
    <div>
      <div>{loading}</div>
      <div>{messageStatus}</div>
      <form onSubmit={handleSubmit} >

      <label>Profile Image</label>
        <input
          type="file"
          onChange={(e) => setImageProfile(e.target.files[0])}
        />

        <label>Bio</label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label>Instagram Account</label>
        <input
          type="url"
          value={instagramAccount}
          onChange={(e) => setInstagramAccount(e.target.value)}
        />

        <label>Birthday</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button type="submit" >Edit Profile</button>
      </form>
    </div>
  )
}