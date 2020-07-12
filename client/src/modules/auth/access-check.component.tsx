import { Result } from 'antd'
import React, { FC, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from './auth.context'

const AccessCheck: FC<{}> = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated } = useContext(AuthContext)
  if (isAuthenticated) {
    return <>{children}</>
  }
  const subTitle = `Please login to view this page: ${location.pathname}`
  return (
    <Result
      status="403"
      title="Not Authenticated"
      subTitle={subTitle}
      extra={<Link to="/login">Visit Login Page</Link>}
    />
  )
}

export default AccessCheck
