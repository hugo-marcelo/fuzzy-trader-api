const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const AssetController = require('./app/controllers/AssetController');
const PortfolioController = require('./app/controllers/PortfolioController');
const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');

const routes = express.Router();

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().required(),
    }),
  }),
  SessionController.store
);

routes.get('/users', UserController.index);
routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().required(),
    }),
  }),
  UserController.store
);

routes.get('/assets', AssetController.index);
routes.post(
  '/assets',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().required(),
      value: Joi.number().required(),
    }),
  }),
  AssetController.store
);
routes.delete(
  '/assets/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  AssetController.delete
);

routes.get('/portfolios', PortfolioController.index);
routes.get(
  '/portfolios/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  PortfolioController.show
);
routes.post(
  '/portfolios',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().required(),
      assetId: Joi.string().required(),
      amount: Joi.number().required(),
    }),
  }),
  PortfolioController.store
);
routes.delete(
  '/portfolios/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  PortfolioController.delete
);
routes.put(
  '/portfolios/:portfolioId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      portfolioId: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().required(),
    }),
  }),
  PortfolioController.update
);

module.exports = routes;
