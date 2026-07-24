const { test, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const mongoose  = require('mongoose')

const api = supertest(app)

test('checking HTTP GET request and no of blogs count', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
})

after(async () => {
    await mongoose.connection.close()
})