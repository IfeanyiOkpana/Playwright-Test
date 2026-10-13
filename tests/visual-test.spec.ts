import { test, expect } from '@playwright/test';
import { herokuFixtureUrl, useHerokuFixture } from './fixtures/heroku-site.js';

test.describe('Visual Test', () => {
    test.beforeEach(async ({ page }) => {
        await useHerokuFixture(page);
        await page.goto(`${herokuFixtureUrl}/`);
    });

    test('Visual Test Login', async ({ page }) => {
        await page.getByRole("link", { name: "Form Authentication" }).click();
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
    });
});