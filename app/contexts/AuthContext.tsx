'use client'
import { createContext, useContext } from 'react'
import { User, UpdateUser, UpdatePassword } from '../_type/users'
import { signUp } from '../_type/auth'
import { useAuth } from '../_hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import "@/app/_ui/stylesheets/loading.css"


type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<User>
  signup: (user: signUp) => Promise<User>
  logout: () => void
  userUpdate: (data: UpdateUser) => Promise<User | null>
  userPasswordUpdate: (data: UpdatePassword) => Promise<User | null>
  userImageUpdate: (data: FormData) => Promise<User | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthGuard({ 
  children,
  requireAuth = true,
  redirectTo = '/login'
}: { 
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}) {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.loading && requireAuth && !auth.isAuthenticated) {
      router.push(redirectTo)
    }
  }, [auth.loading, auth.isAuthenticated, requireAuth, redirectTo, router])

  if (auth.loading) {
    return (<div className='w-full h-full flex items-center justify-center'><span className='spinner'></span></div>);
  }

  if (requireAuth && !auth.isAuthenticated) { // Don't render anything while redirecting
    return null
  }

  return (
    <AuthContext.Provider value={auth}>
      
      {children}
    </AuthContext.Provider>
  )
}