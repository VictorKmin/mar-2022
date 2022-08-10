const express = require('express');
const users = require('./dataBase');
const fileService = require('./services/file.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('REQUEST PROCESSED');

  res.json('HELLO WORLD')
});

app.get('/users', async (req, res) => {
  let usersFronService = await fileService.getUsers();
  res.json(usersFronService);
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json('Wrong user id');
    return;
  }

  const user = users[userId];

  if (!user) {
    res.status(404).json('User not found');
    return;
  }

  res.json(user);
});

app.post('/users', (req, res) => {
  const {age, name} = req.body;

  console.log(age, 'age');
  console.log(name, 'name');

  if (Number.isNaN(+age) || age <= 0) {
    res.status(400).json('Wrong user age');
    return;
  }

  users.push({ name, age })

  res.json('OK');
});

app.listen(5000, () => {
  console.log('App listen 5000')
});

