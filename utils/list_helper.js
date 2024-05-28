const _ = require('lodash/math')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }

  const favorite = blogs.reduce(reducer, blogs[0])

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.map((blog) => {
    const publicationCount = blogs.filter(
      (b) => b.author === blog.author
    ).length
    return {
      author: blog.author,
      blogs: publicationCount,
    }
  })

  return _.maxBy(authors, (author) => author.blogs)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const countLikes = (author) => {
    return blogs.reduce((likes, blog) => {
      return blog.author === author ? likes + blog.likes : likes
    }, 0)
  }

  const authors = blogs.map((blog) => {
    const likes = countLikes(blog.author)
    return {
      author: blog.author,
      likes: likes,
    }
  })

  return _.maxBy(authors, (author) => author.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
