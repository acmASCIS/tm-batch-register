const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');
const auth = require('express-basic-auth');
require('dotenv').config();

const app = express();
const API_URL = process.env.API_URL || 'https://trainees-monitor-dev.herokuapp.com/register';
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN;
const username = process.env.BASIC_AUTH_USERNAME;
const password = process.env.BASIC_AUTH_PASSWORD;

app.use(auth({
  users: { [username]: password },
  challenge: true,
}));

app.use(cors({
  origin,
}));

app.use(express.static('public'));

app.use(express.json());

app.post('/register', async (req, res) => {
  const promises = req.body.map((element) => axios.post(API_URL, {
    ...element,
    handle: element.codeforcesHandle,
    password: '123456',
    confirmPassword: '123456',
    role: 0,
  }));
  const results = (await Promise.allSettled(promises)).map((element, idx) => ({
    ...element,
    trainee: req.body[idx],
  }));
  console.log(results);
  res.status(200).json({ error: false });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
