const { Schema, model } = require('mongoose');

const actionTokenSchema = new Schema({
  token: { type: String, required: true },
  tokenType: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('action_token', actionTokenSchema);
