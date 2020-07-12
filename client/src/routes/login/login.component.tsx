import { Button, Card, Input, notification, Typography } from 'antd'
import axios from 'axios'
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../../modules/auth/auth.context'
import styles from './login.module.scss'

export type LoginProps = {
  mode: 'signIn' | 'signUp'
}
const { Text } = Typography
const Login: FC<LoginProps> = ({ mode }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useContext(AuthContext)

  const loginNow = useCallback(async () => {
    try {
      if (!userName || !password) return null
      setIsLoading(true)
      await login(userName, password)
      notification.success({
        message: 'Login Successful',
        description: 'You will be automatically redirected to Home Page',
      })
    } catch (e) {
      notification.error({
        message: 'Login attempt failed!',
        description: 'Your emailId/password is wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }, [userName, password, login])
  const signUpNow = useCallback(async () => {
    try {
      if (!(userName && password && confirmPassword === password)) return null
      setIsLoading(true)
      await axios.post('/users', { email: userName, password })
      notification.success({
        message: 'User Created Successfully',
        description: 'Please login now.',
      })
      setUserName('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Could not create User',
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }, [userName, password, confirmPassword])
  const onUserNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }, [])
  const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])
  const onConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value)
    },
    []
  )
  if (isAuthenticated) return <Redirect to="/customers" />

  return (
    <Card
      title={mode === 'signIn' ? 'Login' : 'Sign Up'}
      className={styles.container}
      extra={
        <Link to={mode === 'signUp' ? '/login' : '/signUp'}>
          {mode === 'signUp' ? 'Already Registered ? Login!' : 'Register'}
        </Link>
      }
    >
      <div className={styles.label}>Email Id</div>
      <Input
        className={styles.input}
        placeholder="Enter your email id"
        onChange={onUserNameChange}
        value={userName}
      />
      <div className={styles.label}>Password</div>
      <Input.Password
        className={styles.input}
        placeholder="Enter your password"
        onChange={onPasswordChange}
        value={password}
      />
      {mode === 'signUp' ? (
        <>
          <div className={styles.label}>Confirm Password</div>
          <Input.Password
            className={styles.input}
            placeholder="Confirm your password"
            onChange={onConfirmPasswordChange}
            value={confirmPassword}
          />
          {confirmPassword && password && confirmPassword !== password ? (
            <Text type="danger" className={styles.errorText}>
              Passwords does not match. Enter the same password.
            </Text>
          ) : null}
        </>
      ) : null}
      <div className="text-center">
        {mode === 'signIn' ? (
          <Button
            type="primary"
            shape="round"
            onClick={loginNow}
            loading={isLoading}
            disabled={!userName || !password || isLoading}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            shape="round"
            onClick={signUpNow}
            loading={isLoading}
            disabled={
              !userName ||
              !password ||
              !confirmPassword ||
              confirmPassword !== password ||
              isLoading
            }
          >
            Sign Up
          </Button>
        )}
      </div>
    </Card>
  )
}
export default Login
