'use client'
import { useAuthContext } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
export default function Profile () {
  const [profile, setProfile] = useState([])
  const { user } = useAuthContext()

  return (
    <div>
      <div className="flex flex-col shadow-xl mb-7 rounded-2xl" >
          {
            user ?
              <div className="flex flex-col items-center" >
                <Image
                  className="rounded-full mb-1.5"
                  src="/profile-photo.png"
                  alt="Profile Photo"
                  width={200}
                  height={200}
                />

                <p className="text-2xl font-semibold text-gray-800 mb-2.5" >@{user.username}</p>
                <p className="mb-2.5" >{user.profile.bio}</p>

                <div className="flex flex-col text-white font-semibold w-52 mb-3 ">
                  <Link href='/my-posts/' className="flex bg-gradient-to-r from-indigo-600 to-indigo-500  p-2 rounded-sm justify-center mb-3" >My Posts</Link>
                  <Link href='/edit-profile/' className="flex text-indigo-500 bg-indigo-50 border border-indigo-500  p-2 rounded-sm justify-center"  >Edit Profile</Link>
                </div>

                <div className="flex mb-5">
                  <span className="flex justify-center items-center bg-gradient-to-r text-white from-indigo-600 to-indigo-500 p-2.5 rounded-full mx-1.5 " >
                    <a href={user.profile.instagram}>
                      <GrInstagram className="text-lg" />
                    </a>
                  </span>

                  <span className="flex justify-center items-center bg-gradient-to-r text-white from-indigo-600 to-indigo-500 p-2.5 rounded-full mx-1.5" >
                    <a href={user.profile.instagram}>
                      <FaXTwitter className="text-lg" />
                    </a>
                  </span>
                </div>
                {/* <p>Birthday: {user.profile.birthday}</p> */}

              </div>
            : <p>Loading Profile...</p>
          }
      </div>

      <div className="flex justify-evenly">
        <span>
          About
        </span>
        <span>
          Privacy Policy
        </span>
        <span>
          Contact
        </span>
      </div>
    </div>
  )
}