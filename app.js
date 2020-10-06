const express = require('express')
const app = express()

// const request = require('request')
const https = require('https')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email
  const data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data)

  const url = 'https:/us2.api.mailchimp.com/3.0/lists/3b26025776'
  const options = {
    method: 'POST',
    auth: 'hirouchi:f8b35baa249edcc68e55aa4edcede02c-us2'
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/failure.html')
    }
  })

  request.write(jsonData)
  request.end()
})

app.post('/failure', function(req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000')
})

// f8b35baa249edcc68e55aa4edcede02c-us2
// 3b26025776
