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

let diaryEntries = [
  {
    entry_id: 1,
    user_id: 1,
    entry_date: '2024-01-10',
    mood: 'Happy',
    weight: 70.5,
    sleep_hours: 8,
    notes: 'Had a great workout session',
    created_at: '2024-01-10T20:00:00',
  },
  {
    entry_id: 2,
    user_id: 2,
    entry_date: '2024-01-11',
    mood: 'Satisfied',
    weight: 65,
    sleep_hours: 7,
    notes: 'Met with friends, had a good time',
    created_at: '2024-01-11T21:00:00',
  },
  {
    entry_id: 3,
    user_id: 3,
    entry_date: '2024-01-12',
    mood: 'Tired',
    weight: 68,
    sleep_hours: 6,
    notes: 'Work was demanding',
    created_at: '2024-01-12T22:00:00',
  },
  {
    entry_id: 4,
    user_id: 4,
    entry_date: '2024-01-13',
    mood: 'Energetic',
    weight: 55,
    sleep_hours: 9,
    notes: 'Went for a morning run',
    created_at: '2024-01-13T18:00:00',
  },
  {
    entry_id: 5,
    user_id: 5,
    entry_date: '2024-01-14',
    mood: 'Relaxed',
    weight: 75,
    sleep_hours: 8,
    notes: 'Spent the day reading',
    created_at: '2024-01-14T19:00:00',
  },
];

const AUTH_TOKEN = 'hytegym-demo-token';

const requireAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Bearer token' });
  }

  const token = authHeader.slice(7);

  if (token !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

const getNextId = (rows, idKey) => {
  if (!rows.length) return 1;
  return Math.max(...rows.map((row) => row[idKey])) + 1;
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  res.json({
    message: 'Login successful',
    token: AUTH_TOKEN,
    user: {
      username,
    },
  });
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

app.get('/api/entries', requireAuthToken, (_req, res) => {
  res.json(diaryEntries);
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
