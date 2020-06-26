const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('User', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John doe',
        cpf: '11111111111',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
