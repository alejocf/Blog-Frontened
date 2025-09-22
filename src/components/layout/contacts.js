'use client'
import Image from "next/image"
import { useState } from "react"

export default function Contacts () {
  const [dataUsers, setDataUsers] = useState([])

  const get_users = async () => {
    const dataAPI = await fetch('https://blogapi-vuov.onrender.com/api/users/')
      .then((request) => request.json()
      .then((data) => {
        setDataUsers(data)
      })
    )
  }
  get_users()

  return (
    // mx-3.5
    <aside className="row-start-2 col-start-3 shadow-2xl w-56  p-5 rounded-2xl mr-6" >
      <h2 className="text-xl font-semibold mb-3" >
        Users
      </h2>

      <div>
        {
          dataUsers &&
            dataUsers.map((user) => {
              return(
                <div key={user.id} className="flex mb-4 items-center" >
                <Image
                  className="rounded-full mr-2 "
                  src="/profile-photo.png"
                  alt="Profile Photo"
                  width={40}
                  height={40}
                  />
                  <p className="text-sm" >{user.username}</p>
                </div>
              )
            })
        }
      </div>
    </aside>
  )
}