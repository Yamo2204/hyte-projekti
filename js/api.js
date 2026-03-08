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

const EXTERNAL_DEMO_API = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

fetch(EXTERNAL_DEMO_API)
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error(`Verkkovastaus ei ollut kunnossa (HTTP ${response.status})`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('External demo data:', data);
  })
  .catch((error) => {
    console.error('Fetch-operaatiossa ilmeni ongelma:', error);
  });

// Yksikertaistetaan ja modernisoidaan haku
// käytettän async ja await avainsanoja

async function getData() {
  try {
    const response = await fetch(EXTERNAL_DEMO_API);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('External demo data (async/await):', data);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

getData();

// ============================================
// أول طلب إلى Backend الخاص بنا
// هذه الدالة مهمة - تثبت الاتصال بين Frontend و Backend
// ============================================
const consoleLogItems = async () => {
  try {
    // نرسل طلب GET إلى Backend على المنفذ 3000
    // العنوان: http://localhost:3000/api/users
    const response = await fetch('http://localhost:3000/api/users');
    
    // نحول الاستجابة إلى JSON (البيانات من قاعدة البيانات)
    const data = await response.json();
    
    console.log('Haetaan omasta rajapinnasta!!!'); // نحضر من Backend
    console.log(data); // نطبع جميع المستخدمين

    // نمر على كل مستخدم ونطبع معلوماته
    data.forEach((rivi) => {
      console.log(rivi); // طباعة المستخدم كامل
      console.log(rivi.username); // طباعة اسم المستخدم فقط
    });
  } catch (error) {
    console.error('Virhe:', error); // إذا حدث خطأ في الاتصال
  }
};

consoleLogItems();

// ============================================
// الدالة الرئيسية: جلب المستخدمين وعرضهم على الصفحة
// هذه أهم دالة في المشروع - تربط Frontend مع Backend
// ============================================

// نمسك عنصر الزر من HTML
const btnGetAll = document.getElementById('btnGetAll');

// نمسك القائمة الفارغة من HTML (سنملؤها بالبيانات)
const itemsList = document.getElementById('itemsList');

// الدالة الرئيسية - async لأننا نتعامل مع Backend
async function getAllItemsAndRender() {
  try {
    // ======== الخطوة 1: إرسال طلب GET إلى Backend ========
    // نطلب من Backend أن يعطينا قائمة المستخدمين
    const response = await fetch('http://localhost:3000/api/users');
    
    // نتحقق: هل Backend أرسل الرد بنجاح؟
    if (!response.ok) throw new Error('Failed to fetch items');

    // ======== الخطوة 2: تحويل البيانات من JSON ========
    // Backend يرسل البيانات بصيغة JSON، نحولها إلى JavaScript Object
    const data = await response.json();

    // نطبع البيانات في Console للتأكد (مهم للشرح)
    console.log('GET ALL ITEMS (backend):', data);

    // ======== الخطوة 3: عرض البيانات على الصفحة ========
    if (itemsList) {
      // نفرّغ القائمة أولاً (نحذف أي محتوى قديم)
      itemsList.innerHTML = '';
      
      // نمر على كل مستخدم من البيانات
      data.forEach((item) => {
        // ننشئ عنصر <li> جديد لكل مستخدم
        const li = document.createElement('li');
        
        // نضيف تنسيق CSS بسيط
        li.style.padding = '10px';
        li.style.marginBottom = '8px';
        li.style.background = '#f0f0f0';
        li.style.borderRadius = '4px';
        
        // نملأ العنصر بمعلومات المستخدم (اسم، بريد، ID)
        li.innerHTML = `<strong>${item.username}</strong> - ${item.email} <small>(ID: ${item.user_id})</small>`;
        
        // نضيف العنصر إلى القائمة في الصفحة
        itemsList.appendChild(li);
      });
    }
  } catch (error) {
    // ======== التعامل مع الأخطاء ========
    // إذا فشل الاتصال بـ Backend، نعرض رسالة خطأ
    console.error('Virhe:', error);
    if (itemsList) {
      itemsList.innerHTML = '<li style="color:red;">Virhe haettaessa käyttäjiä!</li>';
    }
  }
}

// ======== ربط الزر بالدالة ========
// عندما يضغط المستخدم على الزر، نستدعي الدالة
if (btnGetAll) {
  btnGetAll.addEventListener('click', getAllItemsAndRender);
  // Lataa käyttäjät automaattisesti kun sivu aukeaa
  getAllItemsAndRender();
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

// ============================================
// INDEX PAGE: Items GET + POST homework section
// ============================================
const addItemForm = document.getElementById('addItemForm');
const getItemsButton = document.getElementById('btnGetItems');
const itemsApiList = document.getElementById('itemsApiList');
const itemStatus = document.getElementById('itemStatus');

const setItemStatus = (message, isError = false) => {
  if (!itemStatus) return;
  itemStatus.textContent = message;
  itemStatus.style.color = isError ? '#b00020' : '#2a4b7c';
};

const renderItemsApiList = (items) => {
  if (!itemsApiList) return;

  itemsApiList.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.style.padding = '10px';
    li.style.marginBottom = '8px';
    li.style.background = '#f0f0f0';
    li.style.borderRadius = '4px';
    li.textContent = `ID: ${item.item_id} - ${item.name}${item.weight ? ` (${item.weight} g)` : ''}`;
    itemsApiList.appendChild(li);
  });
};

const fetchItemsForIndex = async () => {
  try {
    setItemStatus('Haetaan itemit...');
    const response = await fetch('http://localhost:3000/api/items');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const items = await response.json();
    renderItemsApiList(items);
    setItemStatus(`Itemit haettu (${items.length} kpl)`);
  } catch (error) {
    console.error('Items GET error:', error);
    setItemStatus(`Virhe haettaessa itemit: ${error.message}`, true);
  }
};

const postItemFromIndexForm = async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('newItemName');
  const weightInput = document.getElementById('newItemWeight');

  const name = nameInput?.value?.trim();
  const weightRaw = weightInput?.value?.trim();

  if (!name) {
    setItemStatus('Name on pakollinen', true);
    return;
  }

  const payload = { name };

  if (weightRaw) {
    const weight = Number(weightRaw);
    if (!Number.isFinite(weight)) {
      setItemStatus('Weight pitää olla numero', true);
      return;
    }
    payload.weight = weight;
  }

  try {
    setItemStatus('Lisätään item...');
    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Lisäys epäonnistui');
    }

    if (addItemForm) {
      addItemForm.reset();
    }

    setItemStatus(`Item lisätty: ${data.name || name}`);
    fetchItemsForIndex();
  } catch (error) {
    console.error('Items POST error:', error);
    setItemStatus(`Virhe lisäyksessä: ${error.message}`, true);
  }
};

if (addItemForm) {
  addItemForm.addEventListener('submit', postItemFromIndexForm);
}

if (getItemsButton) {
  getItemsButton.addEventListener('click', fetchItemsForIndex);
}

if (addItemForm && getItemsButton) {
  fetchItemsForIndex();
}
