'use client'
import { useAuthContext } from "@/contexts/authContext";
import Link from "next/link";
import { useState } from "react";
import Users from "./users";
import SideBar from "./sideBar";
import { HiListBullet } from "react-icons/hi2";

export default function Header () {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuthContext()

  return (
    <>
      <div className="flex justify-between p-3 items-center ">
        <Link className="font-extrabold" href='/'>Posts</Link>
        <div className="font-extrabold" >
        {user ? (
          <>
            <span>Hello {user.first_name}</span>
          </>
        ) : (
          <span>You're not logued</span>
        )}
        </div>

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-indigo-500 text-3xl lg:hidden" >
          <HiListBullet

          className={`transform transition-transform origin-center duration-300 ${
            !sidebarOpen ? "rotate-0" : "rotate-90"
          }`}
          />
        </button>

        {
          sidebarOpen &&
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        }

        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          {
            !user ?
              <Link className="bg-indigo-600 p-2 rounded-lg font-semibold" href='/login/' >Login</Link>
            : <Link className="bg-blue-950 p-2 rounded-lg font-semibold" href='/logout/'>Logout</Link>
          }
        </div>
      </div>

    </>
  )
}