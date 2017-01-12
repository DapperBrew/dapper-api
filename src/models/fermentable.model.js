import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FermentableSchema = new Schema({
  name: String,
});

export default mongoose.model('Fermentable', FermentableSchema);
