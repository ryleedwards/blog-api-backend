import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models/index.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();

dbConnect().catch((err) => console.log(err));
async function dbConnect() {
  await mongoose.connect(process.env.DB_CONNECTION);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/users', routes.user);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
