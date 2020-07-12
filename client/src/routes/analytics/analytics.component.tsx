import axios from 'axios'
import { Table } from 'antd'
import React, { FC, useContext, useEffect, useState } from 'react'
import AuthContext from '../../modules/auth/auth.context'

type AnalyticsUnit = {
  key: number
  day: number
  ordersCount: number
  totalPrice: number
}

const daySorter = (a: AnalyticsUnit, b: AnalyticsUnit): number => a.day - b.day
const ordersCountSorter = (a: AnalyticsUnit, b: AnalyticsUnit): number =>
  a.ordersCount - b.ordersCount
const totalPriceSorter = (a: AnalyticsUnit, b: AnalyticsUnit): number =>
  a.totalPrice - b.totalPrice

const Analytics: FC<{}> = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsUnit[]>([])
  useEffect(() => {
    if (token) {
      const populateData = async () => {
        const res = await axios.get<AnalyticsUnit[]>('/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setData(res.data)
        setLoading(false)
      }
      populateData()
    }
  }, [token])
  return (
    <div>
      <h1>Analytics</h1>
      <Table<AnalyticsUnit>
        dataSource={data}
        className="padding"
        showSorterTooltip
        loading={loading}
        rowKey="day"
      >
        <Table.Column<AnalyticsUnit>
          title="Day of Month"
          key="day"
          dataIndex="day"
          sorter={daySorter}
        />
        <Table.Column<AnalyticsUnit>
          title="Total Orders"
          key="ordersCount"
          dataIndex="ordersCount"
          sorter={ordersCountSorter}
        />
        <Table.Column<AnalyticsUnit>
          title="Total Price"
          key="totalPrice"
          dataIndex="totalPrice"
          sorter={totalPriceSorter}
        />
      </Table>
    </div>
  )
}

export default Analytics
