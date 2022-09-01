const { Schema, model } = require('mongoose');

const previousPasswordSchema = new Schema({
  password: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('previous_password', previousPasswordSchema);
