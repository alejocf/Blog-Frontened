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
        <div className="flex w-36 justify-between">
          <Link className="bg-indigo-600 p-2 rounded-lg font-semibold" href='/login/' >Login</Link>
          <Link className="bg-blue-950 p-2 rounded-lg font-semibold" href='/logout/'>Logout</Link>
        </div>
      </div>
    </header>
  )
}