import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/');
    });

    test('Test Form Functionality', async ({ page }) => {
        await page.getByRole('heading', { name: "Forms"}).click();
        await page.getByText("Forms", { exact: true}).click();

        await page.getByRole('link', { name: "Practice Form", exact: true}).click();

        await page.locator('#firstName').fill("Mike");
        await page.locator('#lastName').fill("Stone");

        await page.locator('#userEmail').fill("mike.stone@example.com");
       
        await expect(page.getByRole('heading', { name: "Practice Form"})).toBeVisible();
      
   
        
     });
});