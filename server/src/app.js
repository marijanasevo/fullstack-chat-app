const path = require('path');
const express = require('express');
const cors = require('cors');
const { chats } = require('../data/chats');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

// allowing client's origin
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const chatId = req.params.id;
  const chat = chats.find(chat => chat._id === chatId);
  res.send(chat);
});

module.exports = app;
