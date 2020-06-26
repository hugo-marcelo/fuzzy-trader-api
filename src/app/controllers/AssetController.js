const generateUniqueId = require('../../utils/generateUniqueId');
const connection = require('../../database/connection');

module.exports = {
  async index(request, response) {
    const assets = await connection('assets').select('*');

    return response.json(assets);
  },

  async store(request, response) {
    const { code, name, type, value } = request.body;

    const id = generateUniqueId();

    await connection('assets').insert({
      id,
      code,
      name,
      type,
      value,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    const asset = await connection('assets')
      .where('id', id)
      .select('*')
      .first();

    if (!asset) {
      return response.status(401).json({ error: 'Asset not found.' });
    }

    await connection('assets')
      .where('id', id)
      .delete();

    return response.status(204).send();
  },
};
