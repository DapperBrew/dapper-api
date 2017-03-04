import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const approvedSchema = new Schema(
  { email: String },
  { collection: 'approved' },
);

export default mongoose.model('Approved', approvedSchema);
