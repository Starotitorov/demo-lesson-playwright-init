import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly clientName: Locator
  readonly clientPhone: Locator
  readonly createOrderButton: Locator
  readonly OkButton: Locator
  readonly url: string = SERVICE_URL + '/orders'

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

  async open() {
    await this.page.goto(this.url)
  }
}
