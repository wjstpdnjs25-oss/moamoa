const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Moamoa backend is running' });
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password || !nickname) {
    return res.status(400).json({ error: 'email, password, nickname are required' });
  }

  const sql = `INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)`;
  db.run(sql, [email, password, nickname], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Failed to create user' });
    }

    res.status(201).json({ id: this.lastID, email, nickname, created_at: new Date().toISOString() });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const sql = `SELECT id, email, nickname, created_at FROM users WHERE email = ? AND password = ?`;
  db.get(sql, [email, password], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to login' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ user });
  });
});

app.listen(PORT, () => {
  console.log(`Moamoa backend running on http://localhost:${PORT}`);
});
