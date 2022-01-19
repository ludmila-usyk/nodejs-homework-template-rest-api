const { User } = require("../../model");

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  return await User.updateOne({ _id: id }, { avatarURL, idAvatarCloud });
};

module.exports = updateAvatar;