import customers from './input/customers.json'
import fs from 'fs'
import path from 'path'
import orders from './input/orders.json'

function processCustomers() {
  const data = customers.map(u => JSON.stringify({...u, __v: 0, updatedAt: u.createdAt})).join('\n')
  const filePath = path.resolve(__dirname, './output', 'customers.txt')
  fs.writeFileSync(filePath, data)
}


function getRandomCustomerId() {
  return customers[Math.floor(Math.random() * customers.length)]._id
}

function processOrders() {
  const data = orders.map(order => JSON.stringify({
    ...order,
    updatedAt: order.createdAt,
    __v: 0,
    customer: getRandomCustomerId()
  })).join('\n')
  const filePath = path.resolve(__dirname, './output', 'orders.txt')
  fs.writeFileSync(filePath, data)
}

processCustomers()
processOrders()


