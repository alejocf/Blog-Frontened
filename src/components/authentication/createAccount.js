'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function CreateAccount() {
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

    <div className="flex flex-col items-center justify-center w-full h-screen p-5 gap-y-10 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold text-blue-600">Create your account</h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-gray-100">{messageStatus}</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

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

            <div className="">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-300 w-full rounded-md p-2"
                required
              />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create Account</button>
            <p className="text-center text-sm/6 text-gray-500">
              I already have an account
              <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Login</Link>
            </p>
          </div>
        </form>

      </div>
    </div>




    // <section className="flex flex-col justify-center items-center h-screen gap-y-10 ">
    //   {/* <h2>{messageStatus}</h2> */}

    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <h2 className="text-center text-3xl font-bold text-blue-600">Create your account</h2>
    //   </div>


    //   <div>
    //     <form className="flex flex-col" onSubmit={handleSubmit} >
    //       <label className="text-gray-500" >Name</label>
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="bg-gray-300 w-full rounded-md p-2"
    //         required
    //         />

    //         <label className="text-gray-500" >Last Name</label>
    //         <input
    //           type="text"
    //           value={lastName}
    //           className="bg-gray-300 w-full rounded-md p-2"
    //           onChange={(e) => setLastName(e.target.value)}
    //           required
    //         />

    //         <label className="text-gray-500" >E-mail</label>
    //         <input
    //           type="text"
    //           value={email}
    //           className="bg-gray-300 w-full rounded-md p-2"
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           />

    //         <label className="text-gray-500" >Username</label>
    //         <input
    //           type="text"
    //           value={username}
    //           className="bg-gray-300 w-full rounded-md p-2"
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />

    //         <label className="text-gray-500" >Password</label>
    //         <input
    //           type="text"
    //           value={password}
    //           className="bg-gray-300 w-full rounded-md p-2"
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           />

    //         <div>
    //           <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create Account</button>
    //         </div>
    //       </form>
    //   </div>
    // </section>

  )
}

