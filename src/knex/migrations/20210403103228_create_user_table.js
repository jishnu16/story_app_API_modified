exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id',{ primaryKey: true });
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('user_type_id').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};