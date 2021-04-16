exports.up = function(knex) {
  return knex.schema.createTable('story', function(table) {
    table.increments('id',{ primaryKey: true });
    table.string('summary');
    table.string('description');
    table.string('type');
    table.string('complexity');
    table.string('estimated_time_of_completion');
    table.string('cost');
    table.string('status');
    table.string('created_by_user_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('story');
};