const { Unauthorized } = require('http-errors')

const current = async(req, res, next) => {
  const currentUser = req.user

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email: currentUser.email,
      subscription: currentUser.role,
    },
  })
}
module.exports = current