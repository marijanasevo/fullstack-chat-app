const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { chats } = require('../data/chats');

const usersRouter = require('./routes/users/users.router');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

// allowing client's origin
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/chats', (req, res) => {
  res.send(chats);
});

app.get('/api/chats/:id', (req, res) => {
  const chatId = req.params.id;
  const chat = chats.find(chat => chat._id === chatId);
  res.send(chat);
});

app.use('/api/users', usersRouter);

module.exports = app;
