import { test, expect, Locator } from '@playwright/test';

test.describe('Sauce-Demo-Home', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
    });

    test('Home', async ({ page }) => {
        const homeLink1:Locator = page.getByRole('link', { name: "Home", exact: true});
        await homeLink1.click();

        await expect(homeLink1).toBeVisible();
    });

    test('Verify image click', async ({ page }) => {
        const greyJacket:Locator = page.getByAltText("Grey jacket");
        await greyJacket.click();

        const greyJacket2:Locator = page.getByAltText("Product Image");

        await expect(greyJacket2).toBeVisible();

        const textDesc:Locator = page.getByText(/Just\s+a\s+demo\s+site\s+showing\s+off\s+what\s+Sauce\s+can\s+do./i);
        await expect(textDesc).toBeVisible();

        //Verify Page Dropdown Functionality
        const greyJacketDropdown:Locator = page.locator("#product-select-option-0");
        await greyJacketDropdown.selectOption("Grey jacket");

        await expect(page.getByRole("heading", { name: "Grey jacket"})).toBeVisible();
        await expect(page.locator(".product-price")).toBeVisible();
    });
});