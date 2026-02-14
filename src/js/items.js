import { fetchData } from './fetch.js';

const ITEMS_API = 'http://localhost:3000/api/items';

const renderItems = (items) => {
  const list = document.querySelector('.fruitlist');
  if (!list) return;

  list.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `ID: ${item.item_id} - ${item.name}${item.weight ? ` (${item.weight} g)` : ''}`;
    list.appendChild(li);
  });
};

const getItems = async () => {
  const items = await fetchData(ITEMS_API);

  if (items.error) {
    console.error('Get items failed:', items.error);
    return;
  }

  renderItems(items);
};

const getItemById = async (event) => {
  event.preventDefault();

  const idInput = document.querySelector('#itemId');
  if (!idInput?.value) {
    alert('Syötä Item ID');
    return;
  }

  const item = await fetchData(`${ITEMS_API}/${idInput.value}`);

  if (item.error) {
    alert(`Virhe: ${item.error}`);
    return;
  }

  alert(`Item löytyi: ${item.name}${item.weight ? ` (${item.weight} g)` : ''}`);
};

const deleteItemById = async () => {
  const idInput = document.querySelector('#itemId');
  if (!idInput?.value) {
    alert('Syötä Item ID');
    return;
  }

  const confirmed = confirm(`Poistetaanko item ID ${idInput.value}?`);
  if (!confirmed) return;

  const result = await fetchData(`${ITEMS_API}/${idInput.value}`, {
    method: 'DELETE',
  });

  if (result.error) {
    alert(`Poisto epäonnistui: ${result.error}`);
    return;
  }

  alert('Item poistettu');
  getItems();
};

const addItem = async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#newItemName');
  const weightInput = document.querySelector('#newItemWeight');

  const name = nameInput?.value?.trim();
  const rawWeight = weightInput?.value?.trim();

  if (!name) {
    alert('Name on pakollinen');
    return;
  }

  const payload = { name };

  if (rawWeight !== '') {
    const weight = Number(rawWeight);
    if (!Number.isFinite(weight)) {
      alert('Weight pitää olla numero');
      return;
    }
    payload.weight = weight;
  }

  const result = await fetchData(ITEMS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (result.error) {
    alert(`Lisäys epäonnistui: ${result.error}`);
    return;
  }

  alert(`Item lisätty: ${result.name || name}`);

  if (event.target instanceof HTMLFormElement) {
    event.target.reset();
  }

  getItems();
};

export { getItems, getItemById, deleteItemById, addItem };
