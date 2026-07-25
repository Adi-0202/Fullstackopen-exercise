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

test('verifing that the unique identifier property of the blog posts is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const checkId = response.body.every(blog => {
        return Object.hasOwn(blog, 'id')
    })

    assert.strictEqual(checkId, true)
})

after(async () => {
    await mongoose.connection.close()
})