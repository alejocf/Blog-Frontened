'use client'

import { useState } from "react"

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const handleSubmit = async (e) => {
    console.log('token', localStorage.getItem('token'));

    e.preventDefault()

    try {
      const post = await fetch('https://blogapi-vuov.onrender.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (post.ok) {
        const data = await post.json()

        localStorage.setItem('token', data.access)
        localStorage.setItem('refresh', data.refresh)

        setMessageStatus('Login succesfully, token save')
        setUsername('')
        setPassword('')
      }

      else {
        setMessageStatus('Invalid Credentials, Try again !!')
        setUsername('')
        setPassword('')
      }
    }

    catch (error) {
      setMessageStatus('API conection error')
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="bg-amber-950" >
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" >Log in</button>
      </form>
      <span>{messageStatus}</span>
    </div>
  )
}