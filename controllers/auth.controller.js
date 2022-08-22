const { authService } = require("../services");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { password: hashPassword, _id } = req.user;

      await authService.comparePasswords(password, hashPassword);

      const authTokens = authService.createAuthTokens({ _id });

      // TODO save token pair to DB with user relation

      res.json({
        ...authTokens,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  }
}
