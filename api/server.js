const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

// middleware
server.use(express.json())

module.exports = server;
