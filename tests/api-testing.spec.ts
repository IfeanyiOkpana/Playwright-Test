import { test, expect } from '@playwright/test'

test.describe("API Testing", () => {
    test('get API', async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users/2");
        const body = await response.json();

        expect(response.status()).toBe(200)
        expect(body.data.id).toBe(2);
        expect(body.data.email).toBe("janet.weaver@reqres.in")
        expect(body.data.first_name).toBe("Janet");
        expect(body.data.last_name).toBe("Weaver");
    });

   

  
});
