'use client'

import { useAuthContext } from "@/contexts/authContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuthContext()
  const router = useRouter()



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(username, password)

    setLoading(false)

    if (success) {
      setMessageStatus('* Login succesfully, token save')
    } else {
      setMessageStatus('* Invalid Credentials')
    }


  }

  return (
      <div className="flex flex-col items-center justify-center w-full h-screen p-5 gap-y-10 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl font-bold text-indigo-500">Sign in to your account</h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-gray-500">{messageStatus}</div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <div>
              <label className="text-gray-500">Username</label>
              <div className="">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-300 w-full rounded-md p-2"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-gray-500">Password</label>
              </div>

              <div className="">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-300 w-full rounded-md p-2"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {
                  loading ?
                  <>
                    Signing in...
                    <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </>
                  : 'Sign in'
                }
              </button>
            </div>
            <p className=".5 text-center text-sm/6 text-gray-400">
              don't have an acount yet?
              <Link href="/create-account/" className="font-semibold text-indigo-400 hover:text-indigo-300"> Create one here!</Link>
            </p>
          </form>

        </div>
      </div>
  )
}