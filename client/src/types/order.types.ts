import { PaginatedResponse } from './paginated.types'

export type Order = {
  _id: string
  product: string
  quantity: number
  price: number
  customer: string
  createdAt: string
  updatedAt: string
  __v: number
  _timestamp?: number
}

export type AllOrdersResponse = PaginatedResponse<Order>
