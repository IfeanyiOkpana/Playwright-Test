import { test, expect } from '@playwright/test';

test.describe('Sauce-Demo-Home', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
    });

    test('Home', async ({ page }) => {
        const homeLink1 = page.getByRole('link', { name: "Home", exact: true});
        await homeLink1.click();

        await expect(homeLink1).toBeVisible();
    });
});