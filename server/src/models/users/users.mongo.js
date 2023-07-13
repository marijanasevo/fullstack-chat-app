const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: 'https://icon-library.com/images/girl-icon/girl-icon-28.jpg',
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function matchPassword(
  enteredPassword
) {
  const user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};

// Just before saving
// @ts-ignore
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified) next();

  const rounds = 10;

  const hash = await bcrypt.hash(user.password, rounds);
  user.password = hash;
});

module.exports = model('User', userSchema);
