import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MiscSchema = new Schema({
  name: String,
});

export default mongoose.model('Misc', MiscSchema);
