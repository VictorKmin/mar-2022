const { ApiError } = require('../errors');
const {
  statusCodes: {BAD_REQUEST},
  fileConstants
} = require('../constants');

module.exports = {
  checkUploadedAvatar: (req, res, next) => {
    try {
      if (!req.files || !req.files.avatar) {
        return next(new ApiError('No avatar', BAD_REQUEST));
      }

      const { avatar } = req.files;

      if (avatar.size > fileConstants.IMAGE_MAX_SIZE) {
        throw new ApiError('File too big', BAD_REQUEST);
      }

      if (!fileConstants.IMAGES_MIMETYPES.includes(avatar.mimetype)) {
        throw new ApiError('Wrong file type', BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
