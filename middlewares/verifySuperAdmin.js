require('dotenv').config()
module.exports = (req, res, next) => {
  const verifKey = req.body.verifykey
  if(verifKey !== process.env.VERIFY_KEY) return res.status(401).send({msg: "Неверный код верефикации"})
  next()
}