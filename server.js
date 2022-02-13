// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API1'});
});

app.get("/api/:date?", function(req, res) {
  let date = req.params["date"];
  if(date == null){
    res.json({utc: (new Date()).toString()})
  } else {
    const ms = Date.parse(date);
    if(isNaN(ms)){
      res.json({error: "Invalid date"})
    } else {
      const unix = parseInt(ms?ms:req.params["date"]);
      let date = new Date(unix);
      res.json({unix: unix, utc: date.toString()})
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
