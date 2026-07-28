const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.status(201).json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!Object.hasOwn(body, 'likes')) body.likes=0
    const blog= new Blog(body)
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports=blogsRouter