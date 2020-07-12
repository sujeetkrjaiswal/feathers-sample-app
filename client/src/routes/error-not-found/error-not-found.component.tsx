import { Result } from 'antd'
import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ErrorNotFond: FC<{}> = () => {
  const location = useLocation()
  const subTitle = `Sorry, the page you visited does not exist: ${location.pathname}`
  return (
    <Result
      status="404"
      title="Requested Page does not exits."
      subTitle={subTitle}
      extra={<Link to="/">Visit Home</Link>}
    />
  )
}

export default ErrorNotFond
