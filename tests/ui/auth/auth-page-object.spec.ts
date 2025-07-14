import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pages/login-page'
import { PASSWORD, USERNAME } from '../../../config/env-data'

test('Sign in with correct credentials', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderPage.statusButton).toBeVisible()

  await orderPage.createOrder('name', '123456789')

  await expect(orderPage.OkButton).toBeVisible()
})
