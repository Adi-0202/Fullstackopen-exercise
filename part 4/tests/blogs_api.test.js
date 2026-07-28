const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(
    response.body.length,
    helper.initialBlogs.length
  )
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  const allBlogsHaveId = response.body.every(blog =>
    Object.hasOwn(blog, 'id')
  )

  assert.strictEqual(allBlogsHaveId, true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testing POST',
    author: 'zoro',
    url: 'laa laa laa.com',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1
  )

  const titles = blogsAtEnd.map(blog => blog.title)

  assert(titles.includes('testing POST'))
})

test('testing if the likes key is missing from POST, it should assign it to zero', async () => {
  const newObj = {
    title: 'testing likes key',
    author: 'myself',
    url: 'laa.com',
  }

  await api
    .post('/api/blogs')
    .send(newObj)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const retrivedDB = await helper.blogsInDB()
  const ourBlog = retrivedDB.find(blog => blog.title==='testing likes key')
  assert.strictEqual(ourBlog.likes, 0)
})

test('testing the object is not added when url or title are missing', async () => {
  const initialBlog = await helper.blogsInDB()
  const newObj = {
    author: 'lll',
    likes: 10,
  }
  await api
    .post('/api/blogs')
    .send(newObj)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const finalBlog = await helper.blogsInDB()
  assert.strictEqual(initialBlog.length, finalBlog.length)
})

test('testing whether a blog can be deleted', async () => {
  const initialBlog = await helper.blogsInDB()
  const blogToBeDeleted = initialBlog[0]

  await api
    .delete(`/api/blogs/${blogToBeDeleted.id}`)
    .expect(204)

  const finalBlog = await helper.blogsInDB()
  const ids = finalBlog.map( blog => blog.id)
  assert(!ids.includes(blogToBeDeleted.id))
  assert.strictEqual(finalBlog.length, initialBlog.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})