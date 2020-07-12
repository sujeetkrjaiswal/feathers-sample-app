import React, { ErrorInfo } from 'react'
type propsType = {}
type stateType = {
  hasError: boolean
  error?: Error
}
export default class ErrorBoundary extends React.Component<
  propsType,
  stateType
> {
  constructor(props: propsType) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
