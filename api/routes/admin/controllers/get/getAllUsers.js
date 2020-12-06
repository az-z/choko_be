module.exports = async (req, res) => {
  const d = new Date(),
    hour = d.getHours(),
    min = d.getMinutes(),
    month = d.getMonth(),
    year = d.getFullYear(),
    sec = d.getSeconds(),
    day = d.getDate();
  const { take, skip, period } = req.query
  let currPeriod = null
  if (period === 'month') currPeriod = `${year},${month}`
  else if (period === 'week') currPeriod = `${year},${month},${day - 6}`
  else if (period === 'day') currPeriod = `${year},${month},${day}`
  else if (period === 'year') currPeriod = `${year}`
  else currPeriod = ''
  console.log(currPeriod, new Date(currPeriod))
  const match = {
    date: {
      $lt: new Date(),
      $gte: new Date(currPeriod)
    }
  }
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
        select: '_id status summ'
      }
    ])
    if(!users) return res.status(404).json({ msg: "Пользователи ненайдены" })
    res.json({
      msg: 'Пользователи найденны успешно',
      users
    })
  } catch (error) {
    res.send(500).json({ msg: "Что-то пошло не так" })
  }
}