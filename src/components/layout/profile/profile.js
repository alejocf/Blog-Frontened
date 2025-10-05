'use client'
import { useAuthContext } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GrInstagram } from "react-icons/gr";

export default function Profile () {
  const { user } = useAuthContext()

  return (
    <>
      {
        user ?
        <div className="flex flex-col justify-center items-center gap-y-2.5 py-5 shadow-xl rounded-2xl md:flex-col  md:h-full md:justify-normal md:gap-y-5" >
          <div className="flex items-center justify-center gap-x-2.5 md:flex-col" >
            <div className="relative w-16 h-16 border border-indigo-500 md:w-48 md:h-48 rounded-full overflow-hidden">
              <Image
              src="/profile-photo.png"
              alt="Profile Photo"
              fill
              className="object-cover"
            />
            </div>

            <div className="flex flex-col justify-center items-center" >
              <p className="text-xl font-semibold text-gray-800" >@{user.username}</p>
              <p className="text-sm" >{user.profile.bio}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-2.5" >
            <div className="flex flex-col text-white font-semibold w-52 gap-y-2.5">
              <Link href='/my-posts/' className="hidden md:flex md:bg-gradient-to-r md:from-indigo-600 to-indigo-500  md:p-2 md:rounded-sm md:justify-center" >My Posts</Link>
              <Link href='/edit-profile/' className="flex text-indigo-500 bg-indigo-50 border border-indigo-500 rounded-sm justify-center md:p-2"  >Edit Profile</Link>
            </div>

            <div className="flex">
              <span className="flex justify-center items-center bg-gradient-to-r text-white from-indigo-600 to-indigo-500 p-2.5 rounded-full mx-1.5 " >
                <a href={user.profile.instagram}>
                  <GrInstagram className="text-lg" />
                </a>
              </span>
            </div>
          </div>
        </div>

        : <p>You don't have an account</p>
      }
    </>
  )
}