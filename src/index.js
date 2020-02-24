const express = require('express');
const routes = require('./routes')

const server = express();

server.use(express.json())
server.use(routes);

const projects = [];

server.post("/projects", (req, res) => {
  
  projects.push(req.body);

  return res.json(req.body);
})

server.get('/projects', (req, res)=>{
  return res.json(projects);
})


server.put('/projects/:id', (req, res)=>{
  const result = projects.filter(project => {
    if(project.id == req.params.id){
      project.title = req.body.title;
    }
    return project;
  });
  
  return res.json(result);
})

server.listen(3333);



