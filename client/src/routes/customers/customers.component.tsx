import { PageHeader, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SyncPagination from '../../components/sync-pagination/sync-pagination.component'
import AuthContext from '../../modules/auth/auth.context'
import { AllCustomersResponse, Customer } from '../../types/customer.types'

const getCustomers = async (token: string, limit = 10, skip = 0) => {
  const res = await axios.get<AllCustomersResponse>(
    `/customers?$limit=${limit}&$skip=${skip}`,
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

const Customers: FC<{}> = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [pageOption, setPageOption] = useState<{ limit: number; skip: number }>(
    { limit: 10, skip: 0 }
  )
  const [res, setRes] = useState<AllCustomersResponse>({
    total: 0,
    limit: 10,
    skip: 0,
    data: [],
  })
  useEffect(() => {
    if (token) {
      setLoading(true)
      getCustomers(token, pageOption.limit, pageOption.skip)
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
      <PageHeader title="Customers" ghost={false} />
      <Table<Customer>
        rowKey="_id"
        dataSource={res.data}
        loading={loading}
        className="padding"
        pagination={false}
      >
        <Table.Column<Customer> title="First Name" dataIndex="firstName" />
        <Table.Column<Customer> title="Last Name" dataIndex="lastName" />
        <Table.Column<Customer> title="Email" dataIndex="email" />
        <Table.Column<Customer> title="Created On" dataIndex="createdAt" />
        <Table.Column<Customer>
          title="Total Orders"
          dataIndex="orders"
          render={(value) => value.length}
        />
        <Table.Column<Customer>
          title="Actions"
          dataIndex="_id"
          render={(value) => (
            <Link to={`/customer/${value}`}>See Order History</Link>
          )}
        />
      </Table>
      <SyncPagination total={res.total} onChange={setPageOption} />
    </div>
  )
}

export default Customers
