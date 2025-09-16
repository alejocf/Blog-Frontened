'use client'

import { useAuthContext } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute ({ children }) {
  const { token } = useAuthContext
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])


  if (!token) {
    return <p>Cargando...</p>
  }

  return children
}