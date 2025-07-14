import { expect, test } from '@playwright/test'
import { BACKEND_URL, PASSWORD, USERNAME } from '../../../config/env-data'
import { OrderPage } from '../../pages/order-page'
import { StatusPage } from '../../pages/status-page'

const loginPath = 'login/student'
let jwt: string = ''

test.beforeAll(async ({ request }) => {
  console.log('Init: getting jwt from backend')
  const response = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: {
      username: USERNAME,
      password: PASSWORD,
    },
  })
  jwt = await response.text()
})

test.beforeEach(async ({ context }) => {
  // Set the local storage value for 'jwt'
  await context.addInitScript((token) => {
    localStorage.setItem('jwt', token)
  }, jwt)
})

test('create order and check success message', async ({ context }) => {
  const page = await context.newPage()
  const orderPage = new OrderPage(page)

  await orderPage.open()
  await orderPage.createOrder('name', '123456789')
})

test('search for existing orders', async ({ context }) => {
  const page = await context.newPage()

  const statusPage = new StatusPage(page, '10192')

  await statusPage.open()

  await expect(statusPage.orderItemFirst).toBeVisible()
})
