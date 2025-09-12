'use client'
import Link from "next/link";
import { useState } from "react";

export default function Profile () {
  // const [profile, setProfile] = useState([])

  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  // if (!token) {
  //   return
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
  //   console.log('profile', profile);

  // }

  // get_profile()



  return (
    <aside className="row-start-2 col-start-1 bg-fuchsia-800" >
      <div className="flex flex-col" >
        Profile
        <div>
          <Link href='/my-posts/'>My Posts</Link>
          <Link href='/edit-profile/'>Edit Profile</Link>
        </div>

        {/* <div>
          {
            profile ?
              profile.map((profile, index) => {
                return (
                  <div key={index} >
                    <img src={profile.profile_photo} />
                    <p>Bio: {profile.bio}</p>
                    <p>Instagram: {profile.instagram}</p>
                    <p>Instagram: {profile.instagram}</p>
                    <p>Birthday: {profile.birthday}</p>
                  </div>
                )
              })
            : <p>You don't have an account</p>
          }
        </div> */}



      </div>
    </aside>
  )
}