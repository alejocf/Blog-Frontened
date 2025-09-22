'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Users () {
  const [dataUsers, setDataUsers] = useState([])
  const [loading, setLoading] = useState('')

  useEffect(() => {
    setLoading('Loading users...')
    const get_users = async () => {
      const res = await fetch('https://blogapi-vuov.onrender.com/api/users/')
      const data = await res.json()
      setDataUsers(data)
      setLoading('')
    }
    get_users()
  }, [])

  return (
    <>
      {
        loading ?
          <p>{loading}</p>
        :
          <div>
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
          </div>
      }
    </>
  )
}