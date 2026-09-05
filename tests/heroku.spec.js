import { test, expect } from '@playwright/test';

test.describe('Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

test('Add/Remove Elements', async ({ page }) => {
  await page.getByRole('link', { name: "Add/Remove Elements"}).click();
  await page.getByRole('button', { name: "Add Element"}).click();
  await page.getByRole('button', { name: "Delete"}).click();
});
});
