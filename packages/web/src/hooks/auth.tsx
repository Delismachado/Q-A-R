/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface User {
  id: string
  email: string
  role: string
}

interface AuthState {
  token: string
  user: User
}

interface SingnInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SingnInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@QAR:token')
    const user = localStorage.getItem('@QAR:user')

    if (token && user) {
      return { token, user: JSON.parse(user) as User }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    })
    const { token, user } = response.data

    localStorage.setItem('@QAR:token', token)
    localStorage.setItem('@QAR:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@QAR:token')
    localStorage.removeItem('@QAR:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
