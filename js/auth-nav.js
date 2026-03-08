const navLoginLink = document.querySelector('.nav-links a[href="login.html"]');

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
};

const initAuthNav = () => {
  if (!navLoginLink) return;

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token) {
    navLoginLink.textContent = 'Login';
    navLoginLink.href = 'login.html';
    navLoginLink.removeAttribute('data-auth-link');
    return;
  }

  navLoginLink.textContent = username ? `Logout (${username})` : 'Logout';
  navLoginLink.href = '#';
  navLoginLink.setAttribute('data-auth-link', 'logout');

  navLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
};

initAuthNav();