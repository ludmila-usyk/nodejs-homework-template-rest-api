const { Router } = require("express");
const { authControllers } = require("../../../controllers");
const {
  registration,
  login,
  logout,
  currentUser,
  uploadAvatar,
} = authControllers;
const { guard, userValidation, upload } = require("../../../middleware");

const authRouter = Router();

authRouter.route("/signup").post(userValidation, registration);
authRouter.route("/login").post(userValidation, login);
authRouter.route("/logout").post(guard, logout);
authRouter.route("/current").post(currentUser);
authRouter.route("/avatar").patch(guard, upload.single("avatar"), uploadAvatar);

module.exports = authRouter;