import { test, expect } from '@playwright/test';
import allUsers from '../test-data/users_page2_response.json'; 

test.describe("API Testing", () => {
    test('Get API all users', async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users?page=2");
        const body = await response.json();

        expect(response.status()).toBe(200);

        console.log(response);
        console.log(response.status());
        console.log(await response.json());

        expect(body).toEqual(allUsers);
    });

    test('Get API single user', async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users/2");
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.data.id).toBe(2);
        expect(body.data.email).toBe("janet.weaver@reqres.in");
        expect(body.data.first_name).toBe("Janet");
        expect(body.data.last_name).toBe("Weaver");
        expect(body.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");
        expect(body.support.url).toBe("https://benhowdle.im/first-cto-playbook?utm_source=reqres&utm_medium=json&utm_campaign=referral");
        expect(body.support.text).toBe("Become a better CTO. A playbook of painful stories and practical advice from a two-time startup CTO.");   
    });

  
});
