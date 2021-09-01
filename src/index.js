const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// { 
// 	id: 'uuid', // precisa ser um uuid
// 	name: 'Danilo Vieira', 
// 	username: 'danilo', 
// 	todos: []
// }

function checksExistsUserAccount(request, response, next) {
  
  const { username } = request.header;

  const existUser = users.find(x => x.username === username);

  if(!existUser){
    return response.status(404).json({
      error: 'Mensagem do erro'
    });
  }

  return next();
}

app.post('/users', (request, response) => {
  
  const { name, username } = request.body;

  const existUsername = users.find(x => x.username === username);

  if(existUsername){
    return response.status(400).json({
      error: 'Mensagem do erro'
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
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
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