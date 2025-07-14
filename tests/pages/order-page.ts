import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly clientName: Locator
  readonly clientPhone: Locator
  readonly createOrderButton: Locator
  readonly OkButton: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.clientName = page.getByTestId('username-input')
    this.clientPhone = page.getByTestId('phone-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.OkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
  }

  async createOrder(name: string, phone: string) {
    await this.clientName.fill(name)
    await this.clientPhone.fill(phone)
    await this.createOrderButton.click()
  }
}
