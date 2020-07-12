import { Order } from './order.types'
import { PaginatedResponse } from './paginated.types'

export type Customer = {
  _id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
  orders: Order[]
  __v: number
}

export type AllCustomersResponse = PaginatedResponse<Customer>
