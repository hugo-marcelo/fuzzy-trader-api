const generateUniqueId = require('../../utils/generateUniqueId');
const connection = require('../../database/connection');

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  },

  async store(request, response) {
    const { name, cpf } = request.body;

    const id = generateUniqueId();

    await connection('users').insert({
      id,
      name,
      cpf,
    });

    return response.json({ id, name, cpf });
  },
};
