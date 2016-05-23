
exports.up = function(knex, Promise) {
  return knex.schema.createTable('videos', function(table){
  	table.integer('user_id').unsigned();
  	table.foreign('user_id').references('id').inTable('users');
  	table.string('video')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('videos')
};
