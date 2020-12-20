module.exports = async (req, res) => {
  const { cashText } = req.body
  req.user.payment.cashText = cashText
  try {
    await req.user.save()
    res.send({ msg: 'Успешно сохранено' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Неудалось сохранить' })
  }
}