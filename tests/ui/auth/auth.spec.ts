import { expect, test } from '@playwright/test'
import { SERVICE_URL } from '../../../config/env-data'

test('Sign in button is disabled when an invalid username is entered', async ({ page }) => {
  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('-')
  const signInButton = page.getByTestId('signIn-button')
  const usernameError = page.getByTestId('username-input-error').nth(0)
  await expect(signInButton).toBeDisabled()
  await expect(usernameError).toBeVisible()
})

test('Sign in button is disabled when username is filled and password is empty', async ({
  page,
}) => {
  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('abc')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('p')
  const signInButton = page.getByTestId('signIn-button')
  await expect(signInButton).toBeDisabled()
  const usernameError = page.getByTestId('username-input-error').nth(1)
  await expect(usernameError).toBeVisible()
})

test('Sign in with invalid credentials', async ({ page }) => {
  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('username')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('password')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()

  const loginError = page.getByTestId('authorizationError-popup')
  await expect(loginError).toBeVisible()
})
