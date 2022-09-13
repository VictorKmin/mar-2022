const { Image } = require('../dataBase');

module.exports = {
  savePhotoInfo(avatarInfo) {
    return Image.create(avatarInfo);
  },

  getById(id) {
    return Image.findById(id);
  },

  getByUserId(userId) {
    return Image.find({ user: userId }, { user: 0 }).sort({ createdAt: -1 });
  },

  getByUserIdPreviousAvatar(userId) {
    return Image
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(1);
  },

  deleteImage(filter) {
    return Image.deleteOne(filter);
  },
};
