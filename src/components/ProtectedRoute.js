'use client'

import { useAuthContext } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute ({ children }) {
  const { token, loading } = useAuthContext()
  const router = useRouter()
  // debugger

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login')
    }
  }, [token, loading, router])


  if (loading) {
    return <p>Cargando...</p>
  }

  if (!token) {
    return <p>Error</p>
  }

  return children
}