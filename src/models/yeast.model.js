import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const YeastSchema = new Schema({
  name: String,
});

export default mongoose.model('Yeast', YeastSchema);
