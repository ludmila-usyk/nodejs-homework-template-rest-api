const { HttpCode } = require("../../utils");
const { MESSAGES } = require("../../utils");

const { AuthService } = require("../../service");

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await AuthService.isUserExist(email);

  // Email is already exist
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: MESSAGES.emailExist,
    });
  }

  const data = await AuthService.create(req.body);
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data,
  });
};

module.exports = registration;