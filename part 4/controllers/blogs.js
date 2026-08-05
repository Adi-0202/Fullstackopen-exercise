const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/users')
const jwt=require('jsonwebtoken')
const { error } = require('../utils/logger')
const { userExtractor }=require('../utils/middleware')
/*
requestTokenFrom = (request) => {
    const authorization=request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}
*/
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(201).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const user = request.user
    const body = request.body
    if (!Object.hasOwn(body, 'likes')) body.likes=0

    if (!body.title || !body.url){
        return response.status(400).json({
            error: 'title or url is missing'
        })
    }
    if(!user){
        response.status(400).json({ error: "userId missing or not valid" })
    }
    const blog= new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id
    })
    
    const savedBlog = await blog.save()
    user.blogs= user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).end()
    }
    if(blog.user.toString() !== user.id.toString()){
        return response.status(401).json({ error: 'only the creator can delete a blog' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).end()
    }
    blog.likes = likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports=blogsRouter