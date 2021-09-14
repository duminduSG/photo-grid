import mongoose from 'mongoose';

import Grid from './grid.model';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL);

const models = { Grid };

export { connectDb };

export default models;
