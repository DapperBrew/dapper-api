import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StyleSchema = new Schema({
  name: String,
});

export default mongoose.model('Style', StyleSchema);
