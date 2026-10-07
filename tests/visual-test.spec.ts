import { test, expect } from '@playwright/test';

test.describe('Visual Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com");
    });

    test('Visual Test Login', async ({ page }) => {
        await page.getByRole("link", { name: "Form Authentication" }).click();
        await expect(page).toHaveScreenshot("login.png", {
            mask: [
                page.locator("#username"),
                page.locator("#password")
            ]
        });
    });
});