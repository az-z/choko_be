module.exports = async (req, res) => {
  res.send({user: req.user, msg: "Авторизация успешна"})
}