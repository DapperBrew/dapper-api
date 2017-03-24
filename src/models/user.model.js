/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Equipment from './equipment.model';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  role: String,
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipes',
  }],
  equipments: [Equipment],
});


UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => cb(null, isMatch))
    .catch(err => cb(err));
};

export default mongoose.model('Users', UserSchema);
