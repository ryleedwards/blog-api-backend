import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models/index.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import CustomError from './utils/CustomError.js';
import globalErrorHandler from './controllers/errorController.js';

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

// Routes
app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/', routes.auth);

// Error handling

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Unhandled errors
app.use(globalErrorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
