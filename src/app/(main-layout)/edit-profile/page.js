'use client'
import { useAuthContext } from "@/contexts/authContext"
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa";

export default function EditProfileView () {
  // const [imageProfile, setImageProfile] = useState(null)
  const { user } = useAuthContext()
  const [bio, setBio] = useState(user.profile.bio)
  const [instagramAccount, setInstagramAccount] = useState(user.profile.instagram)
  const [birthday, setBirthday] = useState(user.profile.birthday)
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bio == user.profile.bio && instagramAccount == user.profile.instagram && birthday == user.profile.birthday) {
      setMessageStatus("* You didn't fill in any fields")
      return
    }

    setLoading(true)

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
        setMessageStatus('An Error Has Occurred')
      } else {
        setMessageStatus("Profile Edited Successfully");
        setLoading(false)
      }
    } catch (error) {
        setLoading(false)
        console.error("Request failed:", error);
        setMessageStatus("API Error Connection");
    } finally {
        setLoading(false)
        setLoading("");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-5" >Edit your profile</h2>

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

      <form onSubmit={handleSubmit} className="flex flex-col" >

        {/* <label>Profile Image</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="file"
          onChange={(e) => setImageProfile(e.target.files[0])}
        /> */}

        <label className="font-semibold" >Bio</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="text"
          placeholder="bio"
          value={ bio }
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="font-semibold" >Instagram Account</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-2"
          type="url"
          placeholder="https://www.instagram.com/your_user/"
          value={instagramAccount}
          onChange={(e) => setInstagramAccount(e.target.value)}
        />

        <label className="font-semibold" >Birthday</label>
        <input
          className="border border-indigo-500 rounded-md p-1 mb-6"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-indigo-600 px-3 py-1.5 rounded-sm text-white font-semibold"
        >
          {
            loading ?
              <>
                Editing Profile
                <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </>

            : 'Edit Profile'
          }
        </button>
      </form>
    </div>
  )
}