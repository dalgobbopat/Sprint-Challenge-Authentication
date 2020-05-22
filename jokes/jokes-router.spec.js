const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('jokes-router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('GET /jokes', () => {
        it('should return 400 for missing credentials', () => {
            return request(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
    })
})