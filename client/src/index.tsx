import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './app.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'
import { AuthContextProvider } from './modules/auth/auth.context'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
