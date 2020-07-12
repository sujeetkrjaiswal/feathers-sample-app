import {Space, Spin} from 'antd'
import React, {FC} from 'react'
import styles from './full-screen-loader.module.scss'

export type FullScreenLoaderProps = {
  title?: string
}

const FullScreenLoader: FC<FullScreenLoaderProps> = ({title}) => {
  return (
    <div className={styles.container}>
      <Space direction="vertical" align="center">
        <Spin size="large" />
        {title ? <span>{title}</span> : null}
      </Space>
    </div>
  )
}

export default FullScreenLoader
