module.exports = async (req, res) => {
  const d = new Date(),
    month = d.getMonth(),
    year = d.getFullYear(),
    day = d.getDate();
    const week = d.getDate() - 6;
  const { take, skip, period } = req.query
  let currPeriod = null
  if (period === 'month') currPeriod = `${year}-${month ? month : month + 1}`
  else if (period === 'week') currPeriod = `${year}-${month + 1}-${week}`
  else if (period === 'day') currPeriod = `${year}-${month + 1}-${day}`
  else if (period === 'year') currPeriod = `${year}`
  else currPeriod = null
  console.log(period, currPeriod, new Date(currPeriod))
  const match = {
    date: {
      $lt: new Date(),
      $gte: new Date(currPeriod ? currPeriod : null)
    }
  }
  console.log(match);
  try {
    const users = await db.Users.find({})
    .limit(take).skip(skip).populate([
      {
        path: 'galleries',
        match,
        select: '_id date'
      },
      {
        path: 'orders',
        match,
        select: '_id status summ'
      }
    ])
    if (!users) return res.status(404).json({ msg: "Пользователи ненайдены" })
    res.json({
      msg: 'Пользователи найденны успешно',
      users
    })
  } catch (error) {
    res.send(500).json({ msg: "Что-то пошло не так" })
  }
}