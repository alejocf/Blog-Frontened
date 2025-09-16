'use client'
import { useAuthContext } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Profile () {
  const [profile, setProfile] = useState([])

  const { user } = useAuthContext()
  // setProfile(user)

  console.log('user:', user);


  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  // if (!token) {
  //   return <p>You don't have an account</p>
  // }

  // const get_profile = async () => {
  //   const dataProfile = await fetch('https://blogapi-vuov.onrender.com/api/my-profile/', {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   })
  //   .then((request) => request.json())
  //   .then((data) => {
  //     setProfile([data])
  //   })

  // }

  // get_profile()



  return (
    <aside className="row-start-2 col-start-1 bg-fuchsia-800" >
      <div className="flex flex-col" >

        <div>
          {
            user ?
              <div className="flex flex-col items-center rounded-3xl" >
                <Image
                  src="/profile-photo.png"
                  alt="Profile Photo"
                  width={200}
                  height={200}
                />
                <p>Bio: {user.profile.bio}</p>
                <p>Instagram: {user.profile.instagram}</p>
                <p>Birthday: {user.profile.birthday}</p>
                <div>
                  <Link href='/my-posts/'>My Posts</Link>
                  <Link href='/edit-profile/'>Edit Profile</Link>
                </div>
              </div>
            : <p>You don't have an account</p>
          }
        </div>
      </div>
    </aside>
  )
}