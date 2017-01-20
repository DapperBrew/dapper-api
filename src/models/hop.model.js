import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HopSchema = new Schema({
  name: String,
});

export default mongoose.model('Hop', HopSchema);
