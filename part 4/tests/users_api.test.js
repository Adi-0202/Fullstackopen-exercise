const { test, after, beforeEach }=require('node:test')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const User=require('../models/users')
const helper=require('./test_helper')
const bcrypt=require('bcrypt')

const api=supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash=await bcrypt.hash('sekret', 10)
    const initialUser=new User({
        username: 'root',
        name: 'Superuser',
        passwordHash,
    })
    await initialUser.save()
})

test('creation fails if username is shorter than 3 characters', async () => {
    const usersAtStart=await helper.usersInDB()
    const newUser={
        username: "la",
        name: "laa laa laa",
        password: "zoro@123"
    }

    const result=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    //console.log(result.body)

    assert(result.body.error.includes('username'))
    const usersAtFinal=await helper.usersInDB()
    assert.strictEqual(usersAtStart.length, usersAtFinal.length)
})

after(async () => {
    await mongoose.connection.close()
})