exports.up = function(knex) {
  return knex.schema.createTable('portfolios', function(table) {
    table.string('id').primary();
    table.decimal('amount').notNullable();

    table.string('user_id').notNullable();
    table.string('asset_id').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users');

    table
      .foreign('asset_id')
      .references('id')
      .inTable('assets');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('portfolios');
};
