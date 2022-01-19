const path = require("path");
const fs = require("fs/promises");
const { userMethod } = require("../../repository");
const { updateAvatar } = userMethod;

const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const { FOLDER_AVATARS } = process.env;

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.folderAvatar = FOLDER_AVATARS;
  }

  async save() {
    const destination = path.join(this.folderAvatar, this.userId);
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.filePath, path.join(destination, this.filename));
    const avatarURL = path.normalize(path.join(this.userId, this.filename));
    await updateAvatar(this.userId, avatarURL);

    return avatarURL;
  }
}

module.exports = LocalStorage;