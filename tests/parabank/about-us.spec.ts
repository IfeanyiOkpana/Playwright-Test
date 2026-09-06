import { test, expect } from '@playwright/test';

test.describe('Parabank', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    });

    test('About Us', async({ page }) => {
        await page.getByRole('link', { name: "About Us"} ).first().click();

        await expect(page.getByRole('heading', { name: "ParaSoft Demo Website"})).toBeVisible();
    });
});