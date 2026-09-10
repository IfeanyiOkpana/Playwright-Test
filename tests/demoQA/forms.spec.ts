import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
    });

    test('Test Form Functionality', async ({ page }) => {
        //await page.getByRole('heading', { name: "Forms"}).click();
        //await page.getByText("Forms", { exact: true}).click();
        
        //await page.getByRole('link', { name: "Practice Form", exact: true}).click();

        //Fill first name and last name
        await page.locator('#firstName').fill("Mike");
        await page.locator('#lastName').fill("Stone");

        //Fill email address
        await page.locator('#userEmail').fill("mike.stone@example.com");
       
        //Choose Gender
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

        //Select Mobile Number
        const mobileNum = page.getByPlaceholder("Mobile Number");
        
        await mobileNum.fill("0123456789");
        
        
        await expect(mobileNum).toBeVisible();
        await expect(mobileNum).toHaveValue("0123456789");
        
        //Select Date of Birth Dropdown
        const dob = page.locator('#dateOfBirthInput');
        await dob.click();

        //Select Year
        const year = page.locator('.react-datepicker__year-select');
        await year.selectOption("2015");

        //Select Month
        const month = page.locator('.react-datepicker__month-select');
        await month.selectOption("September");

        //Select Day
        await page.locator(".react-datepicker__day.react-datepicker__day--015:not(.react-datepicker__day--outside-month)").click();

        //Date of Birth Assertion
        await expect(dob).toHaveValue("15 Sep 2015");

        //Fill Subjects Field
        //const subject = page.locator("#subjectsInput");
        //await subject.fill("Maths");
        //await page.getByRole("option", { name: "Maths", exact: true }).click();

        //Assertions
        //await expect(subject).toBeVisible();
        //await expect(subject).toBeEnabled();
        //await expect(page.getByText("Maths", { exact: true })).toBeVisible();

        //Test Checkbox
        const sports = page.getByLabel("Sports");
        const reading = page.getByLabel("Reading");
        const music = page.getByLabel("Music");

        await sports.check();
        await reading.check();

        //Assertions
        await expect(sports).toBeChecked();
        await expect(reading).toBeChecked();
        await expect(music).not.toBeChecked();

        //Upload Image
        const uploadImage = page.locator("#uploadPicture");
        await uploadImage.setInputFiles('tests/assets/image.jpg');

        //Assertions
        await expect(uploadImage).toBeAttached();
        await expect(uploadImage).toBeEnabled();
        await expect(uploadImage).toHaveValue(/image\.jpg/);
     });
});