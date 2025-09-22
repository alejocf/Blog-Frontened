'use client'
import { useAuthContext } from "@/contexts/authContext"
import { useState } from "react"

export default function EditProfileView () {
  // const [imageProfile, setImageProfile] = useState(null)
  const { user } = useAuthContext()
  const [bio, setBio] = useState(user.profile.bio)
  const [instagramAccount, setInstagramAccount] = useState(user.profile.instagram)
  const [birthday, setBirthday] = useState(user.profile.birthday)
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bio == user.profile.bio && instagramAccount == user.profile.instagram && birthday == user.profile.birthday) {
      setMessageStatus("* You didn't fill in any fields")
      return
    }

    setLoading("Loading...")

    const accesToken = localStorage.getItem("token");

    const formData = new FormData();
    // if (imageProfile) formData.append("profile_photo", imageProfile);
    if (bio) formData.append("bio", bio);
    if (instagramAccount) formData.append("instagram", instagramAccount);
    if (birthday) formData.append("birthday", birthday);

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

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-5" >Edit your profile</h2>

      <div>{loading}</div>
      <div>{messageStatus}</div>
      <form onSubmit={handleSubmit} className="flex flex-col" >

        {/* <label>Profile Image</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="file"
          onChange={(e) => setImageProfile(e.target.files[0])}
        /> */}

        <label>Bio</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="text"
          placeholder="bio"
          value={ bio }
          onChange={(e) => setBio(e.target.value)}
        />

        <label>Instagram Account</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="url"
          placeholder="https://www.instagram.com/your_user/"
          value={instagramAccount}
          onChange={(e) => setInstagramAccount(e.target.value)}
        />

        <label>Birthday</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-6"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button type="submit" className="bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold">Edit Profile</button>
      </form>
    </div>
  )
}