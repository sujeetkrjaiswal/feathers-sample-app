import axios from 'axios'
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import FullScreenLoader from '../../components/full-screen-loader/full-screen-loader.component'

export type AuthContextValue = {
  isAuthenticated: boolean
  token?: string
  email?: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const defaultValue: AuthContextValue = {
  login: () => Promise.resolve(false),
  logout: () => null,
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextValue>(defaultValue)

type AuthResponse = {
  accessToken: string
  user: {
    email: string
  }
}

export const AuthContextProvider: FC<{}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState<undefined | string>(undefined)
  const [token, setToken] = useState<undefined | string>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const res = await axios.post<AuthResponse>('/authentication', {
        strategy: 'local',
        email,
        password,
      })
      setToken(res.data.accessToken)
      setEmail(res.data.user.email)
      setIsAuthenticated(true)
      sessionStorage.setItem('token', res.data.accessToken)
      sessionStorage.setItem('email', res.data.user.email)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
    return true
  }, [])
  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setToken(undefined)
  }, [])
  const value = useMemo((): AuthContextValue => {
    return { token, isAuthenticated, logout, login, email }
  }, [token, isAuthenticated, logout, login, email])

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email')
    if (token && email) {
      setToken(token)
      setEmail(email)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <FullScreenLoader title="Authenticating ..." /> : null}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
