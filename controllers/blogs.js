const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {

  const user = request.user
  if (!(user && request.token)) {
    return response.status(401).end()
  }

  const blog = new Blog({
    url: request.body.url,
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  if (!request.token) {
    return response.status(401).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    ...request.body,
    likes: request.body.likes || 0
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  ).populate('user', { username: 1, name: 1 })

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter