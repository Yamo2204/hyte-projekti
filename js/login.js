import { fetchData } from './fetch.js';

const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

const setStatus = (message, isError = false) => {
  if (!loginStatus) return;
  loginStatus.textContent = message;
  loginStatus.style.color = isError ? '#b00020' : '#2f855a';
};

const login = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value;

  if (!username || !password) {
    setStatus('Täytä käyttäjätunnus ja salasana', true);
    return;
  }

  setStatus('Kirjaudutaan sisään...');

  const response = await fetchData('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.error || !response.token) {
    setStatus(response.error || 'Kirjautuminen epäonnistui', true);
    return;
  }

  localStorage.setItem('token', response.token);
  setStatus('Kirjautuminen onnistui. Siirrytään päiväkirjaan...');

  setTimeout(() => {
    window.location.href = 'diary.html';
  }, 600);
};

if (loginForm) {
  loginForm.addEventListener('submit', login);
}
