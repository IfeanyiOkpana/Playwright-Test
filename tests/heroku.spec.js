import { test, expect } from '@playwright/test';

test.describe('Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle(/The Internet/);
  });

test('Add/Remove Elements', async ({ page }) => {
  await page.getByRole('link', { name: "Add/Remove Elements"}).click();
  await page.getByRole('button', { name: "Add Element"}).click();
  await page.getByRole('button', { name: "Delete"}).click();

  await expect(page.getByRole('heading', { name: "Add/Remove Elements"})).toBeVisible();
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/');
});

test('Checkboxes', async ({ page }) => {
  await page.getByRole('link', { name: "Checkboxes"}).click();

  const check1 = page.getByRole('checkbox').nth(0);
  const check2 = page.getByRole('checkbox').nth(1);

  await check1.check();
  await check2.check();

  await expect(check1).toBeChecked();
  await expect(check2).toBeChecked();

  const header1 = page.getByRole('heading', { name: "Checkboxes"});

  await expect(header1).toBeVisible()

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/checkboxes');
});

});
