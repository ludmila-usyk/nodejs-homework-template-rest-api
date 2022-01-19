const { HttpCode } = require("../../utils");
const { AuthService } = require("../../service");

const currentUser = async (req, res, next) => {
  const bearerHearder = req.headers.authorization;

  if (typeof bearerHearder === "undefined") {
    res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
    return;
  }

  const bearer = bearerHearder.split(" ");
  const token = bearer[1];

  const data = await AuthService.getCurrentDataFromToken(token);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { user: { id: data.id, email: data.email } },
  });
};

module.exports = currentUser;