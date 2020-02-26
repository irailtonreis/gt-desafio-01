const express = require('express');
const routes = require('./routes')

const server = express();

server.use(express.json())
server.use(routes);

const projects = [];

server.use((req, res, next)=>{
  console.count(`Requisição Método ${req.method} URL: ${req.url}`);
  return next();
})

function checkProjectsExists(req, res, next){
  const project = projects.find(p => p.id == req.params.id);

  if(!project){
    return res.status(400).json({ error: "Project not found"})
  }

  return next();
}

server.post("/projects", (req, res) => {
  
  projects.push(req.body);

  return res.json(req.body);
})

server.get('/projects', (req, res)=>{
  return res.json(projects);
})


server.put('/projects/:id', checkProjectsExists, (req, res)=>{

  const result = projects.filter(project => {
    if(project.id == req.params.id){
      project.title = req.body.title;
    }
    return project.id == req.params.id;
  });
  
  return res.json(result);
});

server.delete('/projects/:id', checkProjectsExists, (req, res) =>{

  const result = projects.filter(project => project.id == req.params.id);
  projects.splice(result.id, 1);
  return res.send();
});

server.post('/projects/:id/tasks', checkProjectsExists, (req, res) => {

  const project = projects.find(project =>  project.id == req.params.id);

  project.tasks.push(req.body.title);

  return res.json(project);
})

server.listen(3333);



