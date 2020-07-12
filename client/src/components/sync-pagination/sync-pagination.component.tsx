import { Pagination } from 'antd'
import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export type SyncPaginationProps = {
  total: number
  onChange: (updated: { skip: number; limit: number }) => void
  defaultPageNo?: number
  defaultPageSize?: number
}

const getNumber = (
  urlSearchParams: URLSearchParams,
  key: string,
  defaultValue: number
): number => {
  try {
    const value = urlSearchParams.get(key)
    if (value) {
      const parsed = Number.parseInt(value, 10)
      return parsed
    }
  } catch (e) {
    return defaultValue
  }
  return defaultValue
}

const pageSizeOptions = ['10', '20', '30', '40', '50']
const SyncPagination: FC<SyncPaginationProps> = ({
  onChange,
  total,
  defaultPageSize = 10,
  defaultPageNo = 1,
}) => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const [pageNo, pageSize] = useMemo(() => {
    const searchParameters = new URLSearchParams(search)
    return [
      getNumber(searchParameters, 'pageNo', defaultPageNo),
      getNumber(searchParameters, 'pageSize', defaultPageSize),
    ]
  }, [search, defaultPageNo, defaultPageSize])

  const onPageChange = useCallback(
    (pageNo, pageSize) => {
      const updatedSearchParams = new URLSearchParams(search)
      updatedSearchParams.set('pageNo', `${pageNo}`)
      updatedSearchParams.set('pageSize', `${pageSize}`)
      history.push({
        pathname,
        search: updatedSearchParams.toString(),
      })
    },
    [pathname, history, search]
  )

  useEffect(() => {
    const skip = (pageNo - 1) * pageSize
    onChange({ limit: pageSize, skip: Math.max(skip, 0) })
  }, [pageSize, pageNo, onChange])
  return (
    <div className="text-center margin-vertical">
      <Pagination
        total={total}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        showQuickJumper
        current={pageNo}
        defaultCurrent={defaultPageNo}
        showSizeChanger
        pageSize={pageSize}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={pageSizeOptions}
        onChange={onPageChange}
        onShowSizeChange={onPageChange}
      />
    </div>
  )
}

export default SyncPagination
