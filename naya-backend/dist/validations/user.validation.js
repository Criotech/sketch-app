"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const Joi = require('joi');
const { password } = require('./custom.validation');
const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),
};
exports.createUser = createUser;
const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};
exports.login = login;
