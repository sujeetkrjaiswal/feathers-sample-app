import { BackTop, Button, Layout, Space } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './modules/auth/auth.context'
import Routes from './routes/routes.component'

const { Header, Content, Footer } = Layout

const App = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  return (
    <Layout>
      <Header>
        {isAuthenticated ? (
          <div className="display-flex align-items-center">
            <Space size="large">
              <Link to="/Customers">Customers</Link>
              <Link to="/Orders">Orders</Link>
              <Link to="/analytics">Analytics</Link>
            </Space>
            <span className="spacer" />
            <Button shape="round" type="primary" ghost onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button shape="round" type="primary">
              Login
            </Button>
          </Link>
        )}
      </Header>
      <Content>
        <Routes />
        <BackTop />
      </Content>
      <Footer className="text-center">
        Sujeet Jaiswal ©2020 Created by Sujeet Kumar Jaiswal
      </Footer>
    </Layout>
  )
}

export default App
