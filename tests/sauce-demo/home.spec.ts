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

        //Tested Grey Jacket Add to Cart Functionailty
        const cartGreyJacket:Locator = page.locator("#add");
        await cartGreyJacket.click();

        const addCart1 = page.getByRole("link", { name: "My Cart"});
        await addCart1.click();

        //Grey Jacket Cart Assertions
        //await expect(page.getByAltText("Grey jacket - Grey jacket")).toBeVisible();

        //const greyJacketCart = page.locator("input[type='submit']");
        
        //await greyJacketCart.click();
        //await expect(greyJacketCart).toBeVisible();
    });

    //Verify Catalog
    test("Verify Catalog", async ({ page }) => {
        await page.getByRole("link", { name: "Catalog"}).click()
    
    //Assertion
        await expect(page.getByRole("heading", { name: "Products"})).toBeVisible();

    //Test Image Click Functionality
        const blackHeels = page.getByAltText("Black heels");
        await blackHeels.click();
    //Assertions
        await expect(page.getByRole("heading", { name: "Black heels", exact: true})).toBeVisible();
        await expect(page.getByRole("heading", { name: "£45.00", exact: true})).toBeVisible();
    });

});