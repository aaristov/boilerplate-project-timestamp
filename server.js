// server.js
// where your node app starts

// init project
import {ping, insert} from './mongo.js';
import express from 'express';
// var db = import("mongo.js");
var app = express();
const __dirname = process.cwd();
ping().catch(console.dir);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
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

app.get("/api/insert", function(req, res){
  let user = req.query.user;
  let data = req.query.coord;
  if(user != null && data != null){
    insert(user, data).catch(console.dir);
    res.json({status: "success"})
  } else {
    res.json({error: "Bad request"});
  }
})

// app.get("/api/:date?", function(req, res) {
//   let date = req.params["date"];
//   if(date == null){
//     res.json({utc: (new Date()).toString()})
//   } else {
//     const ms = Date.parse(date);
//     if(isNaN(ms)){
//       res.json({error: "Invalid date"})
//     } else {
//       const unix = parseInt(ms?ms:req.params["date"]);
//       let date = new Date(unix);
//       res.json({unix: unix, utc: date.toString()})
      
//     }
//   }
// });

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
var listener = app.listen(5000, function () {
  console.log('Your app is listening on http://127.0.0.1:' + listener.address().port);
});
