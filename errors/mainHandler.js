// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: 999 // Example field
    });
};
