const express = require('express');
const server = express();
// Complete your server here!
// Do NOT `server.listen()` inside this file!

// require route
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')


// middleware
server.use(express.json())

server.use(actionsRouter)
server.use('/api/projects',projectsRouter)




module.exports = server;
