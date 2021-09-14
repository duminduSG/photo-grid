import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { connectDb } from './models';
import route from './routes';

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', route.images);
app.use('/grid', route.grid);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));
});
