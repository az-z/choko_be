const schedule = require('node-schedule')
const timer = schedule.scheduleJob({ hour: 00, minute: 00 }, async () => {
  const today = new Date()
  try {
    const users = await db.Users.find({
      'active.to': {
        $lte: today
      }
    })
    users.forEach(async element => {
      element.active.status = false
      element.active.trial = false
      const save = await element.save()
    })
    console.log(users);
  } catch (error) {
    console.error(error)
  }
})