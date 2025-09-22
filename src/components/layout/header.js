'use client'
import { useAuthContext } from "@/contexts/authContext";
import Link from "next/link";

export default function Header () {
  const { user } = useAuthContext()

  return (
    <div>
      <div className="flex justify-between p-3 items-center">
        <Link className="font-extrabold" href='/'>Posts</Link>
        <div className="font-extrabold" >
        {user ? (
          <>
            <span>Hello {user.first_name}</span>
          </>
        ) : (
          <span>You're not logued</span>
        )}
        </div>
        <div className="flex justify-between">
          {
            !user ?
              <Link className="bg-indigo-600 p-2 rounded-lg font-semibold" href='/login/' >Login</Link>
            : <Link className="bg-blue-950 p-2 rounded-lg font-semibold" href='/logout/'>Logout</Link>
          }
        </div>
      </div>
    </div>
  )
}