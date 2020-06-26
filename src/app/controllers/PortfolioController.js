const generateUniqueId = require('../../utils/generateUniqueId');
const connection = require('../../database/connection');

module.exports = {
  async index(request, response) {
    const portfolios = await connection('portfolios').select('*');

    return response.json(portfolios);
  },

  async show(request, response) {
    const { userId } = request.params;

    const portfoliosUser = await connection('portfolios')
      .where('user_id', userId)
      .select('*');

    if (portfoliosUser.length === 0) {
      return response
        .status(401)
        .json({ error: 'None portfolio found to this user.' });
    }

    const portfolios = await connection('portfolios')
      .where('user_id', userId)
      .join('assets', 'assets.id', '=', 'portfolios.asset_id')
      .select([
        'portfolios.*',
        'assets.code',
        'assets.name',
        'assets.type',
        'assets.value',
      ]);

    return response.json(portfolios);
  },

  async store(request, response) {
    const { userId, assetId, amount } = request.body;

    const id = generateUniqueId();

    await connection('portfolios').insert({
      id,
      user_id: userId,
      asset_id: assetId,
      amount,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    const portfolio = await connection('portfolios')
      .where('id', id)
      .select('*')
      .first();

    if (!portfolio) {
      return response.status(401).json({ error: 'Portfolio not found.' });
    }

    await connection('portfolios')
      .where('id', id)
      .delete();

    return response.status(204).send();
  },

  async update(request, response) {
    const { portfolioId } = request.params;
    const { amount } = request.body;

    const portfolio = await connection('portfolios')
      .where('id', portfolioId)
      .select('*')
      .first();

    if (!portfolio) {
      return response.status(401).json({ error: 'Portfolio not found.' });
    }

    portfolio.amount = amount;

    await connection('portfolios').update(portfolio);

    return response.json(portfolio);
  },
};
