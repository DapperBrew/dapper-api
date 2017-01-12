import mongoose from 'mongoose';

export default(callback) => {
  // connect to our database
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  };

  const mdb = mongoose.connect(process.env.DB_HOST, options);

  callback(mdb);
};
