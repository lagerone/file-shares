async function getDownloads() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw Error('Invalid token.');
  }
  const response = await fetch('/api/files', {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  const { files } = await response.json();
  return files;
}

async function postLogin(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ username, password }),
  });
  const { token } = await response.json();
  localStorage.setItem('token', token);
}

function renderFiles(token, files) {
  const listItems = files.map((file) => {
    return `
      <li>
          <a href="/downloads/${token}/${file.id}">${file.filename}</a>
      </li>
    `;
  });
  document.getElementById('files').innerHTML = `<ul>${listItems.join('')}</ul>`;
}

async function startApp() {
  try {
    files = await getDownloads();
    renderFiles(localStorage.getItem('token'), files);
  } catch (error) {
    document.getElementById('login-form').classList.remove('hidden');
  }
}

function registerLoginEvent() {
  document
    .getElementById('login-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document
        .querySelector('input[name="username"]')
        .value.trim();
      const password = document
        .querySelector('input[name="password"]')
        .value.trim();
      try {
        await postLogin(username, password);
        document.getElementById('login-form').classList.add('hidden');
        files = await getDownloads();
        renderFiles(localStorage.getItem('token'), files);
      } catch (error) {
        console.error('Login failed.', error);
      }
    });
}

window.document.addEventListener('DOMContentLoaded', () => {
  registerLoginEvent();
  startApp();
});
