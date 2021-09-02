const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

/* 
{ 
 	id: 'uuid', // precisa ser um uuid
 	name: 'Danilo Vieira', 
 	username: 'danilo', 
 	todos: []
}

{ 
  id: 'uuid', // precisa ser um uuid
  title: 'Nome da tarefa',
  done: false, 
  deadline: '2021-02-27T00:00:00.000Z', 
  created_at: '2021-02-22T00:00:00.000Z'
  }
*/

function checksExistsUserAccount(request, response, next) {
  
  const { username } = request.headers;

  const user = users.find(x => x.username === username);

  if(!user){
    return response.status(404).json({
      error: 'Mensagem do n exist erro'
    });
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  
  const { name, username } = request.body;

  const existUsername = users.find(x => x.username === username);

  if(existUsername){
    return response.status(400).json({
      error: 'Mensagem do dzds erro'
    });
  }

  const user = {
    id : uuidv4(),
    name : name,
    username : username,
    todos : []
  }

  users.push(user)
  
  return response.status(201).json(user);

});

app.get('/todos', checksExistsUserAccount, (request, response) => {

  

});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title , deadline } = request.body;
  const user = request.user;

  const todo = {
    id : uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;