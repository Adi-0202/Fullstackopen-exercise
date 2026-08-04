const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/users')
const loginRouter=require('express').Router()

loginRouter.post('/', async (request, response) => {
    const { username, password }=request.body
    const user=await User.findOne({ username })
    const passwordCorrect=user===null?false:bcrypt.compare(password, user.passwordHash)
    if(!passwordCorrect){
        return response.status(401).json({ error: "Invalid username or password" })
    }
    const useForToken={
        username:user.username,
        userId:user.id,
    }
    const token=jwt.sign(useForToken, process.env.SECRET, { expiresIn: 60*60 })
    response.status(201).json({ token, username: user.username, name: user.name })
})

module.exports=loginRouter