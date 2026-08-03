const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'laa laa laa will realize soon that how much i love her',
    author: 'zoro',
    url: 'laa laa laa.com',
    likes: 10,
  },
  {
    title: 'move on by accepting everything',
    author: 'zoro',
    url: 'zoro.com',
    likes: 8,
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB
}