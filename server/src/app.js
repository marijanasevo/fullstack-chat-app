const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users/users.router');
const chatsRouter = require('./routes/chats/chats.router');

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

app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);

module.exports = app;
