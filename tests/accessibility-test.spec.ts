import { test, expect } from '@playwright/test';

test.describe('Accessibility Test', () => {
    test("link", async ({ page }) => {
        await page.goto("https://sauce-demo.myshopify.com/");
    });
});