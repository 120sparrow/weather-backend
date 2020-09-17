const superTest = require('supertest');
const app = require('../app');

module.exports = superTest(app);