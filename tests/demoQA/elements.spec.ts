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
    });
    test('Test Email Field', async ({ page }) => {
        const email = page.locator("#userEmail");
        await email.fill("name@example.com");

        await expect(email).toBeVisible();
        await expect(email).toBeEnabled();
    });
    test('Tested Current Address Form Field', async ({ page }) => {
        const currentAddress = page.locator('#currentAddress');
        await currentAddress.fill("3 Blanco Arena");

        await expect(currentAddress).toBeVisible();
        await expect(currentAddress).toBeEnabled();
        await expect(page.locator("#currentAddress-label")).toBeVisible();
    })
});