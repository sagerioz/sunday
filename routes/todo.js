var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
/* This router is mounted at http://localhost:3000/todo. */
router.get('/', function(req, res, next) {
  knex('todo')
    .select()
    .then(todos => {
      res.render('all', {
        todos: todos
      });
    })

});

function respondAndRenderTodo(id, res, viewName){
  if (typeof id !== 'undefined') {
    knex('todo')
      .select()
      .where('id', id)
      .first()
      .then(todo => {
        console.log("TODO", todo);
        res.render(viewName, todo);
      })
  } else {
    //respond with an error
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    })
  }
}

router.get('/:id', function(req, res, next) {
  const id = req.params.id
  respondAndRenderTodo(id, res, 'single');
});

router.get('/newpost', function(req, res) {
  res.render('newpost');
});


router.get('/:id/edit', function(req, res) {
  // get the todo with the id in the url
  const id = req.params.id
  respondAndRenderTodo(id, res, 'edit');
});

//this will validate req.body. Does it have a title that is not empty and that is a string?
function validTodo(todo) {
  return typeof todo.title === 'string' &&
    todo.title.trim() != '' &&
    typeof todo.priority !== 'undefined' &&
    !isNaN(Number(todo.priority));
}

router.post('/', function(req, res, next) {
  console.log("BODY", req.body);
  if (validTodo(req.body)) {
    //if good, insert into database
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    }
    knex('todo')
      .insert(todo, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/todo/${id}`)
      })
  } else {
    //respond with an error
    res.status(500);
    res.render('error', {
      message: 'Invalid todo'
    })
  }
});

router.put('/:id', (req, res) => {
 let id = req.params.id
 if (validTodo(req.body)) {
   //if good, insert into database
   const todo = {
     title: req.body.title,
     description: req.body.description,
     priority: req.body.priority
   }
   knex('todo')
   .where('id', id)
     .update(todo, 'id')
     .then(() => {
       res.redirect(`/todo/${id}`)
     })
 } else {
   //respond with an error
   res.status(500);
   res.render('error', {
     message: 'Invalid todo'
   });
 }
})

module.exports = router;
