"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (body, keys) => Object.entries(body).reduce((acc, [key, value]) => (keys.includes(key) ? { ...acc, [key]: value } : acc), {});
exports.default = pick;
