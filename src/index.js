const express = require('express');
const routes = require('./routes')

const server = express();

server.use(express.json())
server.use(routes);

const projects = [];

server.use((req, res, next)=>{
  console.log(`Requisição`);
  next();
})

function checkExists(req, res, next){
  project = projects.find(project => project.id = req.params.id);

  if(!project){
    return res.status(400).json({ error: "Id is required"})
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


server.put('/projects/:id', checkExists, (req, res)=>{

  const result = projects.filter(project => {
    if(project.id == req.params.id){
      project.title = req.body.title;
    }
    return project.id == req.params.id;
  });
  
  return res.json(result);
});

server.delete('/projects/:id', checkExists, (req, res) =>{

  const result = projects.filter(project => project.id == req.params.id);
  projects.splice(result.id, 1);
  return res.send();
});

server.post('/projects/:id/tasks', checkExists, (req, res) => {

  const project = projects.find(project =>  project.id == req.params.id);

  project.tasks.push(req.body.title);

  return res.json(projects);

})

server.listen(3333);



