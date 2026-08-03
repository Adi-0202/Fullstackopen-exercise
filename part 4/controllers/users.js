const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1,url: 1, likes: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
   const { username, name, password } = request.body
   if (!password || password.length < 3) {
        return response.status(400).json({
            error: 'password length should be more than 3'
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = userRouter