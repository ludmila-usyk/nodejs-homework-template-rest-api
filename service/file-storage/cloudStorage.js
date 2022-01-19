const { v2: cloudinary } = require("cloudinary");
const { promisify } = require("util");
const { userMethod } = require("../../repository");
const { updateAvatar } = userMethod;
const { unlink } = require("fs/promises");

const {
  VARIABLES_ENV: { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET },
} = require("../../utils");

// cloud folder's name
const cloudFolderAvatars = "nodeJShw05";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.idCloud = user.idAvatarCloud;
    this.folderAvatar = cloudFolderAvatars;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save() {
    const {
      public_id: userIdCloudAvatar,
      secure_url: avatarUrl,
    } = await this.uploadCloud(this.filePath, {
      public_id: this.idCloud,
      folder: this.folderAvatar,
    });

    const newIdCloudAvatar = userIdCloudAvatar.replace(
      `${this.folderAvatars}/`,
      ""
    );

    await updateAvatar(this.userId, avatarUrl, newIdCloudAvatar);

    await this.removeUploadFile(this.filePath);
    return avatarUrl;
  }

  // delete avatarImg from folder 'uploads'
  async removeUploadFile(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = CloudStorage;