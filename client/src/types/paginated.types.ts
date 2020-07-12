export type PaginatedResponse<T> = {
  total: number
  limit: number
  skip: number
  data: T[]
}
