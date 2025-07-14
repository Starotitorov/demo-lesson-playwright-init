import { expect, test } from '@playwright/test'
import { BACKEND_URL, PASSWORD, USERNAME } from '../../config/env-data'

const loginPath = 'login/student'
const createOrderPath = 'orders'

test('auth with correct data should receive token', async ({ request }) => {
  const requestBody = {
    username: USERNAME,
    password: PASSWORD,
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  const jwt = await authResponse.text()
  expect.soft(authResponse.status()).toBe(200)
  expect.soft(jwt).toBeDefined()
})

test('auth with incorrect data should not receive token', async ({ request }) => {
  const requestBody = {
    username: 'username',
    password: 'password',
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  const jwt = await authResponse.text()
  expect.soft(authResponse.status()).toBe(401)
  expect.soft(jwt).toBeFalsy()
})

test('auth and create order', async ({ request }) => {
  const requestBody = {
    username: USERNAME,
    password: PASSWORD,
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  const jwt = await authResponse.text()
  expect.soft(authResponse.status()).toBe(200)
  expect.soft(jwt).toBeDefined()

  const orderPayload = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'customer',
    customerPhone: '123456789',
    comment: 'comment',
    id: 0,
  }

  const orderResponse = await request.post(`${BACKEND_URL}${createOrderPath}`, {
    data: orderPayload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  expect.soft(orderResponse.status()).toBe(200)

  const order = await orderResponse.json()

  expect(order).toBeDefined()

  console.log(order)
})
