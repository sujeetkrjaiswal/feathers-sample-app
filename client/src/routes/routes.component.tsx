import React, { FC, useContext, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ErrorBoundary from '../components/error-boundary/error-boundary.component'
import FullScreenLoader from '../components/full-screen-loader/full-screen-loader.component'
import AccessCheck from '../modules/auth/access-check.component'
import AuthContext from '../modules/auth/auth.context'
import Analytics from './analytics/analytics.index'
import Customer from './customer/customer.index'
import Customers from './customers/customers.index'
import ErrorNotFond from './error-not-found/error-not-found.component'
import Login from './login/login.index.'
import Orders from './orders/orders.index'

const AuthCheckWithSuspenseAndErrorBoundary: FC<{}> = ({ children }) => (
  <ErrorBoundary>
    <AccessCheck>
      <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>
    </AccessCheck>
  </ErrorBoundary>
)

const Routes: FC<{}> = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={isAuthenticated ? '/customers' : '/login'} />
      </Route>
      <Route path="/login" exact>
        <ErrorBoundary>
          <Suspense fallback={<FullScreenLoader />}>
            <Login mode="signIn" />
          </Suspense>
        </ErrorBoundary>
      </Route>
      <Route path="/signUp" exact>
        <ErrorBoundary>
          <Suspense fallback={<FullScreenLoader />}>
            <Login mode="signUp" />
          </Suspense>
        </ErrorBoundary>
      </Route>
      <Route path="/customers" exact>
        <AuthCheckWithSuspenseAndErrorBoundary>
          <Customers />
        </AuthCheckWithSuspenseAndErrorBoundary>
      </Route>
      <Route path="/customer/:id" exact>
        <AuthCheckWithSuspenseAndErrorBoundary>
          <Customer />
        </AuthCheckWithSuspenseAndErrorBoundary>
      </Route>
      <Route path="/orders" exact>
        <AuthCheckWithSuspenseAndErrorBoundary>
          <Orders />
        </AuthCheckWithSuspenseAndErrorBoundary>
      </Route>
      <Route path="/analytics" exact>
        <AuthCheckWithSuspenseAndErrorBoundary>
          <Analytics />
        </AuthCheckWithSuspenseAndErrorBoundary>
      </Route>
      <Route>
        <ErrorNotFond />
      </Route>
    </Switch>
  )
}

export default Routes
