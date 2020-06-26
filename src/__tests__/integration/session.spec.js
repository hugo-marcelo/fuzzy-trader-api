const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('Session', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  it('should be able to login', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'John doe',
        cpf: '11111111111',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        cpf: user.body.cpf,
      });

    expect(response.body).toHaveProperty('cpf');
  });

  it('should not be able to login with a uncreated user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ cpf: 'aaaaaa' });

    expect(response.status).toBe(400);
  });
});
