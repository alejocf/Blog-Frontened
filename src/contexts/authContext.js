'use client'
import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const fetchUser = async (jwToken) => {
    const userRes = await fetch('https://blogapi-vuov.onrender.com/api/my-profile/', {
      headers: { 'Authorization': `Bearer ${jwToken}`, }
    })

    if (userRes.ok) {
      const userData = await userRes.json()
      setUser(userData)
      console.log('user: ', userData);
    }
  }

  const login = async (username, password) => {
    const res = await fetch('https://blogapi-vuov.onrender.com/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      const data = await res.json()
      setToken(data.access)

      await fetchUser(data.access)
      console.log('data: ', data);
      console.log('token: ', token);
      return true
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