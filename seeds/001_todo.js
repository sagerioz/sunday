
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function() {
      // Inserts seed entries
      return knex('todo').insert([{
          id: 1,
          title: 'Make a CRUD app',
          priority: 1
        },
        {
          id: 2,
          title: 'Make another CRUD app',
          priority: 2
        },
        {
          id: 3,
          title: 'Pass the Assessment',
          priority: 3
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('todo_id_seq', (SELECT MAX(id) FROM todo));")
    })
};
