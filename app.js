const express = require('express');

const fileService = require('./services/file.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('REQUEST PROCESSED');

  res.json('HELLO WORLD')
});

app.get('/users', async (req, res) => {
  const usersFronService = await fileService.getUsers();
  res.json(usersFronService);
});
app.post('/users', async (req, res) => {
  const { age, name } = req.body;

  if (Number.isNaN(+age) || age <= 0) {
    res.status(400).json('Wrong user age');
    return;
  }

  const user = await fileService.insertUser({ age, name });

  res.status(201).json(user);
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json('Wrong user id');
    return;
  }

  const user = await fileService.getOneUser(+userId);

  if (!user) {
    res.status(404).json('User not found');
    return;
  }

  res.json(user);
});

app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { age, name } = req.body;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json('Wrong user id');
    return;
  }

  const userObject = {};
  if (age) userObject.age = age;
  if (name) userObject.name = name;

  const user = await fileService.updateUser(+userId, userObject);

  if (!user) {
    res.status(404).json('User not found');
    return;
  }

  res.status(201).json(user);
});

app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json('Wrong user id');
    return;
  }

  const user = await fileService.deleteOneUser(+userId);

  if (!user) {
    res.status(404).json('User not found');
    return;
  }

  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log('App listen 5000');
});

