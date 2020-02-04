/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
'use strict';
const { server, } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web Server', () => {
  describe('middleware functions', () => {
    it('should returns a res status of 500 on error', () => {
      return mockRequest
        .get('/actual-error')
        .then(results => {
          expect(results.status).toBe(500);
        })
        .catch(console.error);
    });
    it('should returns a res status of 404 on not found routes', () => {
      return mockRequest
        .get('/what ever')
        .then(results => {
          expect(results.status).toBe(404);
        })
        .catch(console.error);
    });
  });

  describe('CRUD operations', () => {
    it('should be able to GET', () => {
      return mockRequest
        .get('/api/v1/categories')
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body.count).toBe(0);
        }).catch(console.error);
    });

    it('should be aple to POST', () => {
      return mockRequest
        .post('/api/v1/categories')
        .send({ name: 'nasa', description: 'engineer' })
        .then(results => {
          expect(results.status).toBe(201 || 200);
          expect(results.body.name).toBe('nasa');
        }).catch(console.error);

    });

    it('should be able to PUT', () => {
      return mockRequest
        .put('/api/v1/categories/1')
        .send({ name: 'naseem', description: 'engineer' })
        .then(results => {
          expect(results.status).toBe(200 || 201);
          expect(results.body.name).toBe('naseem');
        }).catch(console.error);

    });

    it('should be able to DELETE', () => {
      return mockRequest
        .delete('/api/v1/categories/1')
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body.msg).toBe('catogery deleted');
        }).catch(console.error);

    });
  });
});