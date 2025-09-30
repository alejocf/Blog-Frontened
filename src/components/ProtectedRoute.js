'use client'

import { useAuthContext } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProtectedRoute ({ children }) {
  const { token, user, loading } = useAuthContext()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!token || !user) {
        router.replace('/login')
      }
      setChecked(true)
    }
  }, [token, user, loading, router])


  if (loading || !checked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!token || !user) {
    return null
  }

  return children
}