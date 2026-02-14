import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let users = [
  { user_id: 1, username: 'dom', email: 'dom@google.com' },
  { user_id: 2, username: 'melissa', email: 'melissa@google.com' },
];

let items = [
  { item_id: 1, name: 'Banana', weight: 120 },
  { item_id: 2, name: 'Cherry', weight: 10 },
];

const getNextId = (rows, idKey) => {
  if (!rows.length) return 1;
  return Math.max(...rows.map((row) => row[idKey])) + 1;
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

app.get('/api/users', (_req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((entry) => entry.user_id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = users.some((entry) => entry.user_id === id);

  if (!exists) {
    return res.status(404).json({ error: 'User not found' });
  }

  users = users.filter((entry) => entry.user_id !== id);
  res.json({ message: `User ${id} deleted` });
});

app.get('/api/items', (_req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((entry) => entry.item_id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, weight } = req.body ?? {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  let numericWeight;
  if (weight !== undefined) {
    numericWeight = Number(weight);
    if (!Number.isFinite(numericWeight)) {
      return res.status(400).json({ error: 'Weight must be a number' });
    }
  }

  const newItem = {
    item_id: getNextId(items, 'item_id'),
    name: name.trim(),
    ...(numericWeight !== undefined ? { weight: numericWeight } : {}),
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = items.some((entry) => entry.item_id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items = items.filter((entry) => entry.item_id !== id);
  res.json({ message: `Item ${id} deleted` });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
