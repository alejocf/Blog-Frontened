'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import API from "@/config/api";

export default function CreateAccount() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.includes('@gmail.com')) {
      setMessageStatus('* Email address must be of the @gmail.com type')
      return
    }

    if (password != passwordConfirmation) {
      setMessageStatus('* Pasword do not match')
      return
    }

    if (password.length < 8) {
      setMessageStatus('* Password must contain at least 8 characters')
      return
    }

    setLoading(true)

    const post = await fetch(API.CREATE_ACCOUNT, {
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

    if (post.ok) {
      setLoading(false)
      setTimeout(() => router.push('/login/'), 900);
    } else {
      setLoading(false)
      if (data.email?.[0]?.includes('already exists')) {
        setMessageStatus('* A user with this email already exists')
      } else if (data.username?.[0]?.includes('already exists')) {
        setMessageStatus('* A user with that username already exists')
      } else {
        setMessageStatus('There has been an error. Please try again')
      }
    }

  }

  return (

    <div className="flex flex-col items-center justify-center w-full h-screen p-5 gap-y-10 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold text-blue-600">Create your account</h2>
      </div>

      <div className="w-full max-w-sm">
        <div className="text-red-500">{messageStatus}</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2.5">

          <div>
            <label className="text-gray-500">Name</label>
            <div className="">
              <input
                type="text"
                value={name}
                className="bg-gray-300 w-full rounded-md p-2"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-500">Last Name</label>
            <div className="">
              <input
                type="text"
                value={lastName}
                className="bg-gray-300 w-full rounded-md p-2"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-500">E-mail</label>
            <div className="">
              <input
                type="text"
                value={email}
                className="bg-gray-300 w-full rounded-md p-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>


          <div>
            <label className="text-gray-500">Username</label>
            <div className="">
              <input
                type="text"
                value={username}
                className="bg-gray-300 w-full rounded-md p-2"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-gray-500">Password</label>
            </div>

            <div className="relative">
              <input
              type={!showPassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-300 w-full rounded-md p-2"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 text-lg"
              >
                {
                  showPassword ?
                    <FaRegEyeSlash />
                  : <MdOutlineRemoveRedEye />
                }
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-gray-500">Password Confirmation</label>
            </div>

            <div className="relative">
              <input
                type={!showPasswordConfirmation ? 'password' : 'text'}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="bg-gray-300 w-full rounded-md p-2"
                required
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 text-lg"
              >
                {
                  showPasswordConfirmation ?
                    <FaRegEyeSlash />
                  : <MdOutlineRemoveRedEye />
                }
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={loading}
            >
              {
                loading ?
                  <>
                    Creating Account
                    <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </>

                : 'Create Account'
              }

            </button>
            <p className="text-center text-sm/6 text-gray-500">
              I already have an account
              <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Login</Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  )
}

