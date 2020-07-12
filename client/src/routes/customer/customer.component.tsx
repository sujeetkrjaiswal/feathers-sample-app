import { Descriptions, PageHeader, Result, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import FullScreenLoader from '../../components/full-screen-loader/full-screen-loader.component'
import AuthContext from '../../modules/auth/auth.context'
import { Customer as CustomerType } from '../../types/customer.types'
import { Order } from '../../types/order.types'

const getCustomerDetails = async (token: string, userId: string) => {
  const res = await axios.get<CustomerType>(`/customers/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  res.data.createdAt = moment(res.data.createdAt).format('LLLL')
  res.data.orders.forEach((order) => {
    const momentTime = moment(order.createdAt)
    order.createdAt = momentTime.format('LLLL')
    order._timestamp = momentTime.unix()
  })
  return res.data
}

const getNumberSorter = (key: keyof Order) => (a: any, b: any) =>
  a[key] - b[key]
const priceSorter = getNumberSorter('price')
const quantitySorter = getNumberSorter('quantity')
const orderDateSorter = getNumberSorter('_timestamp')
const productSorter = (a: Order, b: Order) => a.product.localeCompare(b.product)
const Customer: FC<{}> = () => {
  const { goBack } = useHistory()
  const { id } = useParams<{ id: string }>()
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<null | CustomerType>(null)
  useEffect(() => {
    if (!token) return
    setLoading(true)
    getCustomerDetails(token, id)
      .then((res) => {
        setCustomer(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token, id])
  if (loading) {
    return <FullScreenLoader />
  }
  if (customer === null) {
    return <Result status={404} title="Customer details not available" />
  }
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={goBack}
        title="Customer Details"
        extra={<Link to="/customers">See all Customers</Link>}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="First Name">
            {customer.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {customer.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Active From">
            {customer.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Email Id">
            {customer.email}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Table<Order>
        rowKey="_id"
        dataSource={customer.orders}
        className="padding"
        pagination={false}
      >
        <Table.Column<Order>
          title="Product"
          dataIndex="product"
          sorter={productSorter}
        />
        <Table.Column<Order>
          title="Quantity"
          dataIndex="quantity"
          sorter={quantitySorter}
        />
        <Table.Column<Order>
          title="Price"
          dataIndex="price"
          sorter={priceSorter}
        />
        <Table.Column<Order>
          title="Ordered On"
          dataIndex="createdAt"
          sorter={orderDateSorter}
          defaultSortOrder="descend"
        />
      </Table>
    </div>
  )
}

export default Customer
