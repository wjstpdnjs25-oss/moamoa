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

app.listen(PORT, () => {
  console.log(`Moamoa backend running on http://localhost:${PORT}`);
});
