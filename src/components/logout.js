'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Logout () {
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    router.push('/login/')
  }


  return (
    <div>
      <h2>Are you sure about finish your session ?</h2>

      <div>
        <span>Yes</span>
        <button onClick={handleSubmit}>Logout</button>
      </div>

      <div>
        <span>No</span>
        <Link href='/'>Redirect</Link>
      </div>

    </div>
  )
}