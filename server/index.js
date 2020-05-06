const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const multer = require ('multer');
const path = require('path');
const expressServer = express();
const router = require("./route");
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const IMAGES_PATH = path.resolve(__dirname, 'cvs/images');
const upload = multer({
  dest: IMAGES_PATH,
  limits: {fileSize: 1000000, files: 1}
})

// App Setup
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


mongoose.connect('mongodb://localhost/onlineCv', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
});

expressServer.use(morgan('combined'));
//expressServer.use(bodyParser.json({ type: '*/*' }));
expressServer.use(bodyParser.json({ limit: '1000mb' }));
//expressServer.use(bodyParser.urlencoded({type: '*/*', extended: true, limit: '1000mb'}))
expressServer.use(cors());
//expressServer.use(multer({dest: './uploads/', rename: (fieldname, filename) => filename}))
router(expressServer);
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(expressServer);
server.listen(port);
console.log('Server listening on:', port);