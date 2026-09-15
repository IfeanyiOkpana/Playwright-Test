import { test, expect } from '@playwright/test';

test.describe('Elements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
    });
    test('Test Text Box', async ({ page }) => {
        const fname = page.locator('#userName');
        await fname.fill("Benjamin Johnson");

        await expect(fname).toBeVisible();
        await expect(fname).toBeEnabled();
    })
});