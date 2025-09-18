'use client'
import { useAuthContext } from "@/contexts/authContext";
import Link from "next/link";

export default function Header () {
  const { user } = useAuthContext()

  return (
    <header className="col-span-3 text-white bg-gradient-to-r from-indigo-600 to-indigo-500 " >
      <div className="flex justify-between p-3 items-center">
        <Link className="font-extrabold" href='/'>Home</Link>
        <div className="font-extrabold" >
        {user ? (
          <>
            <span>Hello {user.first_name}</span>
          </>
        ) : (
          <span>You're not logued</span>
        )}
        </div>
        <div className="flex w-32 justify-between">
          <Link className="bg-blue-500 p-2 rounded-lg" href='/login/' >Login</Link>
          <Link className="bg-blue-950 p-2 rounded-lg" href='/logout/'>Logout</Link>
        </div>
      </div>
    </header>
  )
}