import { test, expect } from '@playwright/test'

test.describe("API Testing", () => {
    test('get API', async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users/2");
        expect(response.status()).toBe(200)

        const body = await response.json();
    });

});
