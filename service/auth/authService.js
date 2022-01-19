const jwt = require("jsonwebtoken");
const { userMethod } = require("../../repository");

const {
  VARIABLES_ENV: { JWT_SECRET_KEY },
} = require("../../utils");

class AuthService {
  async isUserExist(email) {
    const user = await userMethod.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, email, subscription, avatarURL } = await userMethod.createUser(
      body
    );
    return {
      id,
      email,
      subscription,
      avatarURL,
    };
  }

  async getUser(email, password) {
    const user = await userMethod.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "8h" });
    return token;
  }

  async setToken(id, token) {
    await userMethod.updateToken(id, token);
  }

  async getCurrentDataFromToken(token) {
    return await jwt.verify(token, JWT_SECRET_KEY);
  }
}
module.exports = new AuthService();