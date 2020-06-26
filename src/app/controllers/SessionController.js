const connection = require('../../database/connection');

module.exports = {
  async store(request, response) {
    const { cpf } = request.body;

    const user = await connection('users')
      .where('cpf', cpf)
      .select('id', 'name', 'cpf')
      .first();

    if (!user) {
      return response
        .status(400)
        .json({ error: 'No user found with this cpf.' });
    }

    return response.json(user);
  },
};
