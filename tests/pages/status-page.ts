import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class StatusPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly orderItemFirst: Locator

  constructor(page: Page) {
    this.page = page
    this.orderItemFirst = page.getByTestId('order-item-0')
  }
}
