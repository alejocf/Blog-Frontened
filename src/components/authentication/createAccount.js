'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function CreateAccount () {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // FUTURE:
    // Create password and email validation

    const post = await fetch('https://blogapi-vuov.onrender.com/api/create-account/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: name,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      })
    })
    const data = await post.json()
    console.log('form: ', data);


    if (post.ok) {
      setMessageStatus('Account created, login redirect...')
      setTimeout(() => router.push('/login/'), 900);
    }
    else {
      setMessageStatus('There has been an error. Please try again')
    }
  }

  return (
    <div className="bg-amber-400" >
      <h2>{messageStatus}</h2>
      <form className="flex flex-col" onSubmit={handleSubmit} >
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>E-mail</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" >Create Account</button>
      </form>
    </div>
  )
}