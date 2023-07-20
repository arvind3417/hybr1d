import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String, default: "buyer" },
});

export const User = mongoose.model('User', userSchema);
