const { Schema, model } = require('mongoose');

// TODO why we dont use try catch inside service
const userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  age: { type: Number, default: 18 },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('user', userSchema);
