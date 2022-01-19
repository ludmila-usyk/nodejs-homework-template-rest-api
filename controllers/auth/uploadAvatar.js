const { HttpCode } = require("../../utils");
const { fileStorage } = require("../../service");
// eslint-disable-next-line no-unused-vars
const { AvatarStorage, LocalStorage, CloudStorage } = fileStorage;

// LocalStorage - static/local
// CloudStorage - with using cloudinary

const uploadAvatar = async (req, res, next) => {
  const uploadService = new AvatarStorage(CloudStorage, req.file, req.user);

  const avatarURL = await uploadService.updateAvatar();

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { avatarURL },
  });
};

module.exports = uploadAvatar;