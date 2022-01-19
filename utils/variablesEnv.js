const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  JWT_SECRET_KEY,
  UPLOAD_DIR,
  PORT,
  URI_DB,
  FOLDER_AVATARS,
} = process.env;

module.exports = {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  JWT_SECRET_KEY,
  UPLOAD_DIR,
  PORT,
  URI_DB,
  FOLDER_AVATARS,
};