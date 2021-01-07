const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const API_URL = process.env.API_URL || 'https://trainees-monitor-dev.herokuapp.com/register';
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN;

app.use(cors({
  origin,
}));

app.use(express.static('public'));

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const promises = req.body.map((element) => axios.post(API_URL, {
      ...element,
      handle: element.codeforcesHandle,
      password: '123456',
      confirmPassword: '123456',
      role: 0,
    }));
    await Promise.all(promises);
    res.status(200).json({ error: false });
  } catch (error) {
    res.status(500).json({ error: true });
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
