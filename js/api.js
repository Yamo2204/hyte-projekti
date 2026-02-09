import '../css/api.css';

// ✅ ADDITION: import functions that api.js uses
import { getItems, getItemById } from './items.js';
// ملاحظة: deleteItemById إذا موجود بملف آخر نضيفه بعدين

console.log('Scripti starttaa');

// sync ja asyc ajatus ja demo

function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 10000; i++) {
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}

// synchronousFunction();

console.log('Valmis');

// synkroninen
console.log('1');
console.log('2');
console.log('3');

// async suoritus

console.log('1');

setTimeout(() => {
  console.log('2');
}, 4000);

console.log('3');

// GET
// eka haku ulkoiseen rajapintaan
// tämä on fetch käyttäen promisea (eli lupausta)
// ja ON asykroninen

fetch('https://api.restful-api.dev/objects')
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Verkkovastaus ei ollut kunnossa');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Fetch-operaatiossa ilmeni ongelma:', error);
  });

// Yksikertaistetaan ja modernisoidaan haku
// käytettän async ja await avainsanoja

async function getData() {
  try {
    const response = await fetch('https://api.restful-api.dev/objects');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

getData();

// ensimmäinen oma kutsu BE puolelle
const consoleLogItems = async () => {
  try {
    // default on GET kutsu ilman optiota
    const response = await fetch('http://localhost:3000/api/items');
    const data = await response.json();
    console.log('Haetaan omasta rajapinnasta!!!');
    console.log(data);

    data.forEach((rivi) => {
      console.log(rivi);
      console.log(rivi.name);
    });
  } catch (error) {
    console.error('Virhe:', error);
  }
};

consoleLogItems();

// =========================
// ADDITION: Get all items + render list on index.html (btnGetAll + itemsList)
// =========================
const btnGetAll = document.getElementById('btnGetAll');
const itemsList = document.getElementById('itemsList');

async function getAllItemsAndRender() {
  try {
    const response = await fetch('http://localhost:3000/api/items');
    if (!response.ok) throw new Error('Failed to fetch items');

    const data = await response.json();

    // console.log المطلوب
    console.log('GET ALL ITEMS (backend):', data);

    // عرضهم على الصفحة (index.html)
    if (itemsList) {
      itemsList.innerHTML = '';
      data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `Item: ${item.id} | Tuote: ${item.name}`;
        itemsList.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Virhe:', error);
  }
}

if (btnGetAll) {
  btnGetAll.addEventListener('click', getAllItemsAndRender);
}

// =========================
// Existing UI buttons/forms (ADDITION: null-checks so index.html won't crash)
// =========================
const getItemBtn = document.querySelector('.get_items');
if (getItemBtn) {
  getItemBtn.addEventListener('click', getItems);
}

const getFrom = document.querySelector('.get_item_from');
if (getFrom) {
  getFrom.addEventListener('submit', getItemById);
}

// deleteItemById مو موجود عندنا هنا، نخليه آمن بدون ما يكسر
const deleteBtn = document.querySelector('.delete_item');
if (deleteBtn) {
  // إذا عندك deleteItemById بملف ثاني، ارسله وأنا أضيف import
  deleteBtn.addEventListener('click', () => {
    console.warn('deleteItemById not wired yet (function not imported).');
  });
}
