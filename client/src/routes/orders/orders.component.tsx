import { PageHeader, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SyncPagination from '../../components/sync-pagination/sync-pagination.component'
import AuthContext from '../../modules/auth/auth.context'
import { AllOrdersResponse, Order } from '../../types/order.types'

const getOrders = async (token: string, limit = 10, skip = 0) => {
  const res = await axios.get<AllOrdersResponse>(
    `/orders?$limit=${limit}&$skip=${skip}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  res.data.data.forEach((u) => {
    u.createdAt = moment(u.createdAt).format('LLLL')
  })
  return res.data
}

const Orders: FC<{}> = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [pageOption, setPageOption] = useState<{ limit: number; skip: number }>(
    { limit: 10, skip: 0 }
  )
  const [res, setRes] = useState<AllOrdersResponse>({
    total: 0,
    limit: 10,
    skip: 0,
    data: [],
  })
  useEffect(() => {
    if (token) {
      setLoading(true)
      getOrders(token, pageOption.limit, pageOption.skip)
        .then((res) => {
          setRes(res)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token, pageOption.skip, pageOption.limit])
  return (
    <div>
      <PageHeader title="Orders" ghost={false} />
      <Table<Order>
        rowKey="_id"
        dataSource={res.data}
        loading={loading}
        className="padding"
        pagination={false}
      >
        <Table.Column<Order> title="Product" dataIndex="product" />
        <Table.Column<Order> title="Quantity" dataIndex="quantity" />
        <Table.Column<Order> title="Price" dataIndex="price" />
        <Table.Column<Order> title="Ordered On" dataIndex="createdAt" />
        <Table.Column<Order>
          title="Customer"
          dataIndex="customer"
          render={(value) => (
            <Link to={`/customer/${value}`}>Customer's Details</Link>
          )}
        />
      </Table>
      <SyncPagination total={res.total} onChange={setPageOption} />
    </div>
  )
}

export default Orders
