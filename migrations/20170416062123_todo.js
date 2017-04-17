exports.up = function(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.integer('priority').notNullable();
    table.text('description');
    table.boolean('done').defaultTo(false).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
