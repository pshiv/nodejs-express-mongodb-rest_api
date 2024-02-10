const express = require("express");
require('dotenv').config();
const cors = require("cors");
const connectToDB = require("./src/config/db.config");
const path = require('path');

var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


const productRoutes = require("./src/routes/product.route");
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.route');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

/* ## DB connection ##*/
connectToDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



  // simple route
app.get("/", (req, res) => {
  res.json({ message: `Application is running on (${req.protocol}) mode.` });
});

// # Static path for the uploaded files
app.use('/static/profile', express.static('C:/Users/shiv_/Music/profiles'))
app.use('/static/files', express.static('C:/Users/shiv_/Music/files'))


app.use('/api/auth', authRoutes); // Auth Router
app.use('/api/user', userRoutes); // User Router
app.use('/api/product', productRoutes); // Product Router

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

/// set port, listen for requests
const HTTP_PORT = process.env.HTTP_HOST || 8000;
const HTTPS_PORT = process.env.HTTPS_HOST || 8043;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Http server is running on port ${HTTP_PORT}.`);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Https server is running on port ${HTTPS_PORT}.`);
});
