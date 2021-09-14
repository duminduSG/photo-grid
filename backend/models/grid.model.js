import mongoose from 'mongoose';

const { Schema } = mongoose;

const GridSchema = new Schema({
  grid: [
    {
      id: Number,
      src: String,
      width: Number,
      height: Number,
    },
  ],
});

const Grid = mongoose.model('grid', GridSchema);

export default Grid;
