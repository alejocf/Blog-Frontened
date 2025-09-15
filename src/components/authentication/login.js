'use client'

import Link from "next/link"
import { useState } from "react"

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState('')

  const handleSubmit = async (e) => {
    console.log('token', localStorage.getItem('token'));
    setLoading('Loading...')
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

        setMessageStatus('* Login succesfully, token save')
        setLoading('')
        setUsername('')
        setPassword('')
      }

      else {
        setMessageStatus('* Invalid Credentials, Try again !!')
      }
    }

    catch (error) {
      setMessageStatus('* API conection error')
    }
  }

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-600">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-gray-100">{messageStatus}</div>
          <div className="text-gray-100">{loading}</div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-100">Username</label>
              <div className="mt-2">
                <input id="username" type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-100">Password</label>
              </div>
              <div className="mt-2">
                <input id="password" type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            don't have an acount yet?
            <Link href="/create-account/" className="font-semibold text-indigo-400 hover:text-indigo-300"> Create one here!</Link>
          </p>
        </div>
      </div>
  )
}