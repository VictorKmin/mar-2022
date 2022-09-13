const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
  image: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('image', ImageSchema);
