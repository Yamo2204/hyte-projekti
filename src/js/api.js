import '../../css/api.css';
import { getItems, getItemById, deleteItemById, addItem } from './items.js';

const getItemsButton = document.querySelector('.get_items');
if (getItemsButton) {
  getItemsButton.addEventListener('click', getItems);
}

const getItemForm = document.querySelector('.get-item-form');
if (getItemForm) {
  getItemForm.addEventListener('submit', getItemById);
}

const deleteButton = document.querySelector('.delete-item');
if (deleteButton) {
  deleteButton.addEventListener('click', deleteItemById);
}

const addItemForm = document.querySelector('.add-item-form');
if (addItemForm) {
  addItemForm.addEventListener('submit', addItem);
}

getItems();
