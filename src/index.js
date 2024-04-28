import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
