const express = require('express');
const app = express();
const PORT = 4000;


app.use(express.json());

let times = [];

// Create
app.post('/times', (req, res) => {
  const time = req.body;
  // Verifica se já existe um item com esse id
  if (times.some(i => i.id === time.id)) {
    return res.status(400).json({ error: 'ID já existe' });
  }
  times.push(time);
  res.status(201).json(time);
});

// Read all
app.get('/times', (req, res) => {
  res.json(times);
});

// Read one
app.get('/times/:id', (req, res) => {
  const time = times.find(i => i.id == req.params.id);
  if (time) {
    res.json(time);
  } else {
    res.status(404).json({ error: 'Time não encontrado' });
  }
});

// Update
app.put('/times/:id', (req, res) => {
  const id = req.params.id;
  const index = times.findIndex(i => i.id == id);
  if (index !== -1) {
    times[index] = req.body;
    res.json(times[index]);
  } else {
    res.status(404).json({ error: 'Time não encontrado' });
  }
});

// Delete
app.delete('/times/:id', (req, res) => {
  const id = req.params.id;
  const index = times.findIndex(i => i.id == id);
  if (index !== -1) {
    const deleted = times.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Time não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
