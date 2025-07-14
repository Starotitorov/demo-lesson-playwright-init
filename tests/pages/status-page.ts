import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class StatusPage {
  readonly page: Page
  readonly url: string
  readonly orderItemFirst: Locator

  constructor(page: Page, orderId: string) {
    this.page = page
    this.orderItemFirst = page.getByTestId('order-item-0')
    this.url = SERVICE_URL + 'order/' + orderId
  }

  async open() {
    await this.page.goto(this.url)
  }
}
