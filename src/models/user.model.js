/* eslint-disable func-names */
import mongoose from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import validator from 'validator';
import bcrypt from 'bcrypt';
import Equipment from './equipment.model';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply an email address',
    validate: [validator.isEmail, 'Invalid Email Address'],
  },
  password: String,
  role: String,
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipes',
  }],
  equipments: [Equipment],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});


// not to self:
// Don't change this to arrow function, need "this"
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
  return null;
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => cb(null, isMatch))
    .catch(err => cb(err));
};

UserSchema.plugin(mongodbErrorHandler);

export default mongoose.model('Users', UserSchema);
