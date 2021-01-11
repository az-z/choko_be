
/* The example for the payload above.

  "Messages":[
    {
      "To": [
        {
          "Email": "photo_order@keytophoto.com",
          "Name": ""
        }
      ],
  TemplateID: 2197408, //completed order
  TemplateLanguage: true,
  "Subject": "Your completed order",
  "Variables": {
    "name": "CUS NAME",
    "order_url": "https://yahoo.com",
          "order_price": "100 gr",
          "order_date": "today",
          "order_id": "100"
  }
    }
  ]
})

*/


const mailjet = require('node-mailjet')
require('dotenv').config()

mailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const mailer = async function (payload, html) {
  try {
    const request = await mailjet
      .post("send", { 'version': 'v3.1' })
      .request(
        {
          "Globals": {
            "From": {
              "Email": "photo_order@keytophoto.com",
              "Name": "Photo Order"
            }
          },
          "Messages": [payload]
        }
      )
    request
      .then((result) => {
        console.log(result.body)
      })
      // Should not this break the execution ?
      .catch((err) => {
        console.log(err.statusCode)
      })

  } catch (error) {
    console.error('MAIL ERROR: ', error)
  }
}

module.exports = mailer

