'use client'
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
    <aside className="row-start-2 col-start-3 bg-lime-700" >
      <h2>
        Contacts
      </h2>

      <div>
        {
          dataUsers &&
            dataUsers.map((user) => {
              return(
                <div key={user.id} >
                  <p>{user.username}</p>
                </div>
              )
            })
        }
      </div>
    </aside>
  )
}