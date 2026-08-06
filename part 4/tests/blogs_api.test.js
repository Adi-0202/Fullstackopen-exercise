const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const newUser = new User({
    username: 'laa laa laa',
    name: 'zoro',
    passwordHash,
  })
  const savedUser = await newUser.save()
  const blogs = helper.initialBlogs.map(blog => ({
    ...blog,
    user: savedUser._id
  }))
  const savedBlogs = await Blog.insertMany(blogs)
  savedUser.blogs = savedBlogs.map(blog => blog._id)
  await savedUser.save()
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'laa laa laa',
      password: 'sekret'
    })
  token = loginResponse.body.token
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newObj)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const retrievedDB = await helper.blogsInDB()
  const ourBlog = retrievedDB.find(blog => blog.title==='testing likes key')
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const finalBlog = await helper.blogsInDB()
  const ids = finalBlog.map( blog => blog.id)
  assert(!ids.includes(blogToBeDeleted.id))
  assert.strictEqual(finalBlog.length, initialBlog.length - 1)
})

test('testing PUT', async () => {
  const initialBlog = await helper.blogsInDB()
  const updatingBlog = initialBlog[0]
  updatingBlog.likes=updatingBlog.likes+1
  await api
    .put(`/api/blogs/${updatingBlog.id}`)
    .send(updatingBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: 'testing without token',
    author: 'zoro',
    url: 'laa laa laa.com',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length
  )

})

after(async () => {
  await mongoose.connection.close()
})