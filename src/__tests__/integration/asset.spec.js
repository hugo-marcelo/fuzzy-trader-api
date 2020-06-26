const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('Asset', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  it('should be able to create a new asset', async () => {
    const response = await request(app)
      .post('/assets')
      .send({
        code: 'XPT',
        name: 'stock_example',
        type: 'stock',
        value: 1,
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
