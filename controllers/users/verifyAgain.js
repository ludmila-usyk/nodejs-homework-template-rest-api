const { User } = require('../../schemas')
const { sendEmail } = require('../../helpers')

const verifyAgain = async(req, res) => {
  const { email } = req.body
  if (!email) {
    res.json({
      code: 400,
      message: 'Missing required field email'
    })
    return
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.json({
      code: 400,
      message: 'User not found'
    })
    return
  }
  if (user.verify) {
    res.json({
      code: 400,
      message: 'Verification has already been passed'
    })
    return
  }
  const registrationMail = {
    to: email,
    subject: 'Registration confirm',
    html: `<a target="_blank" href = "http://localhost:3000/api/users/verify/${user.verificationToken}">Click it to confirm a registration</a>`
  }
  await sendEmail(registrationMail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = verifyAgain