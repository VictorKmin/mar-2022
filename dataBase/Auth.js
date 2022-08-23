const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('auth', carSchema);
