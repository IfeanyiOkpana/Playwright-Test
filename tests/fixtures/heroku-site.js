export const herokuFixtureUrl = 'http://the-internet.test';

const pages = {
  '/': `
    <h1>Welcome to the-internet</h1>
    <ul>
      <li><a href="/add_remove_elements/">Add/Remove Elements</a></li>
      <li><a href="/checkboxes">Checkboxes</a></li>
      <li><a href="/drag_and_drop">Drag and Drop</a></li>
      <li><a href="/upload">File Upload</a></li>
      <li><a href="/dropdown">Dropdown</a></li>
      <li><a href="/login">Form Authentication</a></li>
    </ul>`,
  '/add_remove_elements/': `
    <h3>Add/Remove Elements</h3>
    <button id="add">Add Element</button>
    <div id="elements"></div>
    <script>
      document.querySelector('#add').addEventListener('click', () => {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => button.remove());
        document.querySelector('#elements').append(button);
      });
    </script>`,
  '/checkboxes': `
    <h3>Checkboxes</h3>
    <input type="checkbox"><br>
    <input type="checkbox">`,
  '/drag_and_drop': `
    <h3>Drag and Drop</h3>
    <div id="column-a" draggable="true">A</div>
    <div id="column-b" draggable="true">B</div>
    <script>
      let dragged;
      document.querySelectorAll('[draggable="true"]').forEach((column) => {
        column.addEventListener('dragstart', () => { dragged = column; });
        column.addEventListener('dragover', (event) => event.preventDefault());
        column.addEventListener('drop', (event) => {
          event.preventDefault();
          if (dragged && dragged !== column) {
            const sourceText = dragged.textContent;
            dragged.textContent = column.textContent;
            column.textContent = sourceText;
          }
        });
      });
    </script>`,
  '/upload': `
    <h3>File Uploader</h3>
    <input id="file-upload" type="file">
    <button id="file-submit" type="button">Upload</button>`,
  '/dropdown': `
    <h3>Dropdown List</h3>
    <select id="dropdown">
      <option value="">Please select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>`,
  '/login': `
    <h2>Login Page</h2>
    <form>
      <label for="username">Username</label>
      <input id="username" name="username">
      <label for="password">Password</label>
      <input id="password" name="password" type="password">
      <button type="submit">Login</button>
    </form>`,
};

export async function useHerokuFixture(page) {
  await page.route(`${herokuFixtureUrl}/**`, async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    const body = pages[pathname];

    await route.fulfill({
      status: body ? 200 : 404,
      contentType: 'text/html; charset=utf-8',
      body: `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>The Internet</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 3rem auto; max-width: 48rem; }
              input, select, button { display: block; margin: 0.5rem 0 1rem; }
              #column-a, #column-b { display: inline-block; padding: 2rem; margin: 1rem; border: 1px solid; }
            </style>
          </head>
          <body>${body ?? '<h1>Not Found</h1>'}</body>
        </html>`,
    });
  });
}
