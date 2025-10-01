'use client'
import { useState } from "react"
import Link from "next/link"
import { CgClose } from "react-icons/cg"
import { IoIosPaper, IoIosArrowDown } from "react-icons/io"
import { HiUsers } from "react-icons/hi"
import { FaPowerOff } from "react-icons/fa"
import Users from "./users";
// import Users from "./Users"

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  const [usersAccordion, setUsersAccordion] = useState(false)
  const [postsAccordion, setpostsAccordion] = useState(false)

  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ease-in-out z-40
        ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`flex flex-col justify-between fixed top-0 left-0 h-full w-56 bg-gradient-to-t from-indigo-800 to-indigo-500 shadow-2xl p-5 z-50
          transform transition-transform duration-500 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-y-2.5 animate-fadeIn">
          <span
            onClick={() => setSidebarOpen(false)}
            className="flex justify-end text-3xl cursor-pointer hover:scale-110 transition-transform"
          >
            <CgClose />
          </span>

          <div
            onClick={() => setpostsAccordion(!postsAccordion)}
            className={`${
              postsAccordion ? "bg-gray-300 text-black" : "bg-indigo-400"
            } rounded-md px-2.5 w-full py-1.5 transition-colors`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-1.5">
                <IoIosPaper />
                <span className="font-bold">Posts</span>
              </div>
              <IoIosArrowDown
                className={`transform transition-transform ${
                  postsAccordion ? "rotate-180" : ""
                }`}
              />
            </div>

            {postsAccordion && (
              <div className="flex flex-col ml-2.5 gap-1.5 mt-2 animate-fadeIn">
                <Link href="/">All Posts</Link>
                <Link href="/my-posts">My Posts</Link>
              </div>
            )}
          </div>

          <div
            onClick={() => setUsersAccordion(!usersAccordion)}
            className={`${
              usersAccordion ? "bg-gray-300 text-black" : "bg-indigo-400"
            } flex flex-col gap-y-2.5 rounded-md px-2.5 w-full py-1.5 transition-colors`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-1.5">
                <HiUsers />
                <span className="font-bold">Users</span>
              </div>
              <IoIosArrowDown
                className={`transform transition-transform ${
                  usersAccordion ? "rotate-180" : ""
                }`}
              />
            </div>

            {usersAccordion && (
              <div className="mt-2 animate-fadeIn">
                <Users />
              </div>
            )}
          </div>
        </div>

        <Link
          className="flex items-center gap-x-1.5 bg-blue-950 p-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          href="/logout/"
        >
          <FaPowerOff />
          Logout
        </Link>
      </div>
    </>
  )
}