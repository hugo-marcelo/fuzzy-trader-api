exports.up = function(knex) {
  return knex.schema.createTable('assets', function(table) {
    table.string('id').primary();
    table.string('code').notNullable();
    table.string('name').notNullable();
    table.decimal('value').notNullable();
    table.enu('type', ['crypto', 'stock']).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('assets');
};
