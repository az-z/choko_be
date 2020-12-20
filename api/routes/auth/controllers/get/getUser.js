module.exports = async (req, res) => {
  try {
    const user = await db.Users.findOne({ _id: req.user._id })
      .select('_id name email picture description facebook phoneNumber site login instagram active storage payment')
    res.send({ user: user, msg: "Авторизация успешна" })
  } catch (error) {
    res.status(500).json({ msg: 'Что-то пошло не так' })
  }
}