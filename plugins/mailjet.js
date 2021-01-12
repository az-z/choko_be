const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

function mailer( payload, html ){

const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
	  "Globals": {
         	"From": {
            		"Email": "photo_order@keytophoto.com",
            		"Name": "Photo Order"
          	},
          	TemplateLanguage: true
        	},
        "Messages":[payload]
    })

request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err)
    })

} // end of function
module.exports = mailer