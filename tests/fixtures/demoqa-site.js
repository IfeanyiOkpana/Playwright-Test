export const demoQaFixtureUrl = 'http://demoqa.test';

const textBoxPage = `
  <h1>Text Box</h1>
  <label for="userName">Full Name</label>
  <input id="userName">
  <label for="userEmail">Email</label>
  <input id="userEmail" type="email">
  <label id="currentAddress-label" for="currentAddress">Current Address</label>
  <textarea id="currentAddress"></textarea>
  <label for="permanentAddress">Permanent Address</label>
  <textarea id="permanentAddress"></textarea>
  <button id="submit" type="button">Submit</button>`;

const practiceFormPage = `
  <h1>Student Registration Form</h1>
  <form id="registration">
    <label for="firstName">First Name</label><input id="firstName">
    <label for="lastName">Last Name</label><input id="lastName">
    <label for="userEmail">Email</label><input id="userEmail" type="email">
    <fieldset>
      <legend>Gender</legend>
      <label><input type="radio" name="gender" value="Male"> Male</label>
      <label><input type="radio" name="gender" value="Female"> Female</label>
      <label><input type="radio" name="gender" value="Other"> Other</label>
    </fieldset>
    <label for="mobile">Mobile Number</label><input id="mobile" placeholder="Mobile Number">
    <label for="dateOfBirthInput">Date of Birth</label>
    <input id="dateOfBirthInput" value="">
    <div id="date-picker" hidden>
      <select class="react-datepicker__year-select">
        <option value="2015">2015</option>
      </select>
      <select class="react-datepicker__month-select">
        <option value="8">September</option>
      </select>
      <button type="button" class="react-datepicker__day react-datepicker__day--015">15</button>
    </div>
    <fieldset>
      <legend>Hobbies</legend>
      <label><input type="checkbox" name="hobbies" value="Sports"> Sports</label>
      <label><input type="checkbox" name="hobbies" value="Reading"> Reading</label>
      <label><input type="checkbox" name="hobbies" value="Music"> Music</label>
    </fieldset>
    <label for="uploadPicture">Picture</label><input id="uploadPicture" type="file">
    <label for="currentAddress">Current Address</label><textarea id="currentAddress" placeholder="Current Address"></textarea>
    <button id="state" type="button">Select State</button>
    <div id="state-options" hidden><button type="button">NCR</button></div>
    <button id="city" type="button">Select City</button>
    <div id="city-options" hidden><button type="button">Gurgaon</button></div>
    <button type="submit">Submit</button>
  </form>
  <script>
    const dateInput = document.querySelector('#dateOfBirthInput');
    const datePicker = document.querySelector('#date-picker');
    dateInput.addEventListener('click', () => { datePicker.hidden = false; });
    datePicker.querySelector('.react-datepicker__day').addEventListener('click', () => {
      dateInput.value = '15 Sep 2015';
      datePicker.hidden = true;
    });
    document.querySelector('#state').addEventListener('click', () => {
      document.querySelector('#state-options').hidden = false;
    });
    document.querySelector('#state-options button').addEventListener('click', (event) => {
      document.querySelector('#state').textContent = event.target.textContent;
      document.querySelector('#state-options').remove();
    });
    document.querySelector('#city').addEventListener('click', () => {
      document.querySelector('#city-options').hidden = false;
    });
    document.querySelector('#city-options button').addEventListener('click', (event) => {
      document.querySelector('#city').textContent = event.target.textContent;
      document.querySelector('#city-options').remove();
    });
    document.querySelector('#registration').addEventListener('submit', (event) => event.preventDefault());
  </script>`;

const pages = {
  '/text-box': textBoxPage,
  '/automation-practice-form': practiceFormPage,
};

export async function useDemoQaFixture(page) {
  await page.route(`${demoQaFixtureUrl}/**`, async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    const body = pages[pathname];

    await route.fulfill({
      status: body ? 200 : 404,
      contentType: 'text/html; charset=utf-8',
      body: `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>DemoQA</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 3rem auto; max-width: 48rem; }
              input, textarea, button, select { display: block; margin: 0.5rem 0 1rem; }
              fieldset label { display: inline-block; margin-right: 1rem; }
              fieldset input { display: inline; }
            </style>
          </head>
          <body>${body ?? '<h1>Not Found</h1>'}</body>
        </html>`,
    });
  });
}
