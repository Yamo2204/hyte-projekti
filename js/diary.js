import { fetchData } from './fetch.js';

const fetchEntriesBtn = document.getElementById('fetchEntriesBtn');
const logoutBtn = document.getElementById('logoutBtn');
const entriesContainer = document.getElementById('entriesContainer');
const statusEl = document.getElementById('status');

const coverImages = [
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
];

const setStatus = (message, isError = false) => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#b00020' : '#2a4b7c';
};

const clearCards = () => {
  if (entriesContainer) {
    entriesContainer.innerHTML = '';
  }
};

const getAuthState = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  return {
    token,
    username,
    isLoggedIn: Boolean(token),
  };
};

const renderAuthStatus = () => {
  const { isLoggedIn, username } = getAuthState();

  if (logoutBtn) {
    logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
  }

  if (fetchEntriesBtn) {
    fetchEntriesBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
  }

  if (!isLoggedIn) {
    setStatus('Kirjaudu ensin sisään, jotta token on localStoragessa.', true);
    return;
  }

  if (username) {
    setStatus(`Olet kirjautunut sisään käyttäjänä: ${username}`);
    return;
  }

  setStatus('Olet kirjautunut sisään. Voit hakea päiväkirjamerkinnät.');
};

const createCard = (entry, index) => {
  const card = document.createElement('article');
  card.className = 'card';

  const image = document.createElement('img');
  image.src = coverImages[index % coverImages.length];
  image.alt = 'Diary cover';

  const body = document.createElement('div');
  body.className = 'card-body';

  body.innerHTML = `
    <p><strong>Date:</strong> ${entry.entry_date}</p>
    <p><strong>Mood:</strong> ${entry.mood}</p>
    <p><strong>Weight:</strong> ${entry.weight} kg</p>
    <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
    <p class="note"><strong>Notes:</strong> ${entry.notes}</p>
  `;

  card.appendChild(image);
  card.appendChild(body);

  return card;
};

const renderEntries = (entries) => {
  clearCards();

  entries.forEach((entry, index) => {
    const card = createCard(entry, index);
    entriesContainer.appendChild(card);
  });
};

const fetchEntriesFromApi = async () => {
  const { token } = getAuthState();

  if (!token) {
    return { error: 'Token puuttuu. Kirjaudu ensin sisään.' };
  }

  const response = await fetchData('/api/entries', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const fetchEntries = async () => {
  setStatus('Haetaan päiväkirjamerkinnät API:sta...');

  let entries = await fetchEntriesFromApi();

  if (entries.error) {
    setStatus('API ei vastannut tokenilla, haetaan varadata /diary.json', true);
    entries = await fetchData('/diary.json');

    if (entries.error) {
      setStatus(`Virhe: ${entries.error}`, true);
      clearCards();
      return;
    }
  }

  if (!Array.isArray(entries)) {
    setStatus('Vastaus ei ollut taulukko', true);
    clearCards();
    return;
  }

  renderEntries(entries);
  setStatus(`Merkinnät haettu (${entries.length} kpl)`);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setStatus('Uloskirjautuminen valmis. Token poistettu localStoragesta.');
  clearCards();
  renderAuthStatus();
};

if (fetchEntriesBtn) {
  fetchEntriesBtn.addEventListener('click', fetchEntries);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

renderAuthStatus();
