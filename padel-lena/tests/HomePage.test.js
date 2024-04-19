import {test, expect, webkit} from '@playwright/test';

require('dotenv').config();

test('should navigate to the login page', async ({ page }) => {
  await page.goto('http://localhost:3000/Home');
  await Promise.all([
    page.waitForNavigation(), 
    page.click('text=Reservar ahora'), 
  ]);
  expect(page.url()).toBe('http://localhost:3000/login');
})