const express = require('express');
const routes = require('./routes')

const server = express();

server.use(express.json())
server.use(routes);

const projects = [];
server.post("/projects", (req, res) => {
  return res.json(req.body);
})

server.listen(3333);



