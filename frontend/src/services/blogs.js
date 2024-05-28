import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${blogId}`

  const response = await axios.delete(url, config)
  return response.data
}

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogObject = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blogObject, config)

  return response.data
}

export default { getAll, create, setToken, addLike, remove }