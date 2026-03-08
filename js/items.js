// ============================================
// ملف items.js - مسؤول عن عرض المستخدمين في القائمة
// ============================================

import { fetchData } from './fetch.js';

// ============================================
// دالة لعرض قائمة المستخدمين على الصفحة
// تستقبل البيانات من Backend وتعرضها
// ============================================
const renderFruitList = (items) => {
  console.log('Teen kohta listan'); // "سأعمل قائمة الآن"
  
  // نمسك عنصر القائمة <ul> من HTML
  const list = document.querySelector('.fruitlist');
  
  // نفرّغ القائمة (نحذف أي محتوى قديم)
  list.innerHTML = '';

  console.log(items); // نطبع البيانات للتحقق

  // نمر على كل مستخدم ونضيفه للقائمة
  items.forEach((item) => {
    console.log(item.username); // نطبع اسم المستخدم
    
    // ننشئ عنصر <li> جديد
    let li = document.createElement('li');
    
    // نملأه بمعلومات المستخدم
    li.textContent = `User ID: ${item.user_id} - Username: ${item.username} - Email: ${item.email}`;
    
    // نضيفه للقائمة
    list.appendChild(li);
  });
};

// ============================================
// دالة لجلب جميع المستخدمين من Backend
// ============================================
const getItems = async () => {
  // نستخدم fetchData (موجود في fetch.js) لإرسال طلب GET
  // العنوان: /api/users
  const items = await fetchData('/api/users');

  // نتحقق: هل جاء خطأ من Backend؟
  if (items.error) {
    console.log(items.error); // نطبع الخطأ
    return; // نوقف التنفيذ
  }

  // إذا نجح الطلب، نعرض المستخدمين على الصفحة
  renderFruitList(items);
};

// GEt item by ID
/////////////////////

const getItemById = async (event) => {
  console.log('Haetaan IDn avulla!!!');

  event.preventDefault();

  //const idInput = document.getElementById('itemID');
  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  const url = `/api/users/${itemId}`;

  const options = {
    method: 'GET',
  };

  const item = await fetchData(url, options);

  // jos BE puolelta tulee virhe niin informoidaan
  // joko consoleen tai käyttäjälle virheestä

  if (item.error) {
    console.log(item.error);
    return;
  }

  console.log(item);
  alert(`User found :) ${item.username} - ${item.email}`);
};

export { getItems, getItemById };