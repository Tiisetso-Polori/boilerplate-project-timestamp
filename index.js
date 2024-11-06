// index.js
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
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let dateIn = req.params.date;
  let unixTimestamp, utcDate;

  if (!dateIn) {
    // No date parameter provided; use current date
    const now = new Date();
    unixTimestamp = now.getTime();
    utcDate = now.toUTCString();
  } 
  else if (!isNaN(dateIn)) {
    // If dateIn is a timestamp (number)
    const timestamp = parseInt(dateIn);

    // Determine if it's seconds or milliseconds
    const date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }

    unixTimestamp = date.getTime();
    utcDate = date.toUTCString();
  } 
  else {
    // If dateIn is a string in yyyy-mm-dd format
    const date = new Date(dateIn);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }

    unixTimestamp = date.getTime();
    utcDate = date.toUTCString();
  }

  res.json({ unix: unixTimestamp, utc: utcDate });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
