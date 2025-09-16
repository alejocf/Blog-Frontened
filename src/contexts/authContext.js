'use client'
import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    const res = await fetch('https://blogapi-vuov.onrender.com/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      const data = await res.json()
      setToken(data.access)

      const user = await fetch('https://blogapi-vuov.onrender.com/api/my-profile/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, }
      })

      const userData = await user.json()
      setUser(userData)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }


  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      { children }
    </AuthContext.Provider >
  )

}


export function useAuthContext() {
  return useContext(AuthContext);
}