const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('Portfolio', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  it('should be able to create a new portfolio', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'John doe',
        cpf: '11111111111',
      });

    const asset = await request(app)
      .post('/assets')
      .send({
        code: 'XPT',
        name: 'stock_example',
        type: 'stock',
        value: 1,
      });

    const response = await request(app)
      .post('/portfolios')
      .send({
        userId: user.body.id,
        assetId: asset.body.id,
        amount: 1,
      });

    expect(response.body).toHaveProperty('id');
  });
});
