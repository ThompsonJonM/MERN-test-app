const express = require("express");
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

mongoose.Promise = Promise;
// mongoose.connect('mongodb://thompsonjonm:1Qaz2WsX@ds117615.mlab.com:17615/merntestdb')
//   .then(() => {
//     console.log('Starting');
//   })

//   .catch(err => {
//     console.error('App starting error:', err.stack);
//     process.exit(1);
//   });

mongoose.connect('mongodb://localhost/merntestdb');
const db = mongoose.connection;

const testRouter = require('./routes/testRouter')

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', testRouter);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
