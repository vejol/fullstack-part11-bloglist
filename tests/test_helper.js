const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    'author': 'Kimmo Kimpele',
    'title': 'Leivotaan rukiista',
    'url': 'http://kimmoleipoo.fi',
    'likes': 10
  },
  {
    'author': 'Silja Silvonen',
    'title': 'Maastopyörällä Mäntsälään',
    'url': 'http://www.bikemanstala.com',
    'likes': 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const deleteUsers = async () => {
  await User.deleteMany({})
}

const createUser = async (username, full_name, password) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await new User({ username: username, name: full_name, passwordHash })
  await user.save()
}

const login = async (username, password) => {
  const response = await api.post('/api/login')
    .send({ 'username': username, 'password': password })
    .set('Content-Type', 'application/json')
  return response.body.token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  deleteUsers,
  createUser,
  login
}