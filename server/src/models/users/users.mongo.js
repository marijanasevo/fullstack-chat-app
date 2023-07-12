const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default: 'https://icon-library.com/images/girl-icon/girl-icon-28.jpg',
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
