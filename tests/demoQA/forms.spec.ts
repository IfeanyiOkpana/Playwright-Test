import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
    });

    test('Test Form Functionality', async ({ page }) => {
        //await page.getByRole('heading', { name: "Forms"}).click();
        //await page.getByText("Forms", { exact: true}).click();
        
        //await page.getByRole('link', { name: "Practice Form", exact: true}).click();

        await page.locator('#firstName').fill("Mike");
        await page.locator('#lastName').fill("Stone");

        await page.locator('#userEmail').fill("mike.stone@example.com");
        const male = page.getByRole("radio", { name: "Male", exact: true});
        const female = page.getByRole("radio", { name: "Female", exact: true});
        const other = page.getByRole("radio", { name: "Other", exact: true});

        await male.check();
        //await female.check();

        await expect(male).toBeChecked();
        await expect(female).not.toBeChecked();
        await expect(other).not.toBeChecked();

        await female.check();

        await expect(female).toBeChecked();
        await expect(male).not.toBeChecked();
        await expect(other).not.toBeChecked();

        await other.check();

        await expect(other).toBeChecked();
        await expect(male).not.toBeChecked();
        await expect(female).not.toBeChecked();
        
        await expect(page.getByRole('heading', { name: "Student Registration Form"})).toBeVisible();

        const mobileNum = page.getByPlaceholder("Mobile Number");
        
        await mobileNum.fill("0123456789");
        
        await expect(mobileNum).toBeVisible();
        await expect(mobileNum).toHaveValue("0123456789");
        
   
        
     });
});