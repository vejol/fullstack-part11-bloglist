import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [fullDetails, setfullDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleFullDetails = () => {
    setfullDetails(!fullDetails)
  }

  if (fullDetails) {
    return (
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title} {blog.author}<button onClick={toggleFullDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className='likes-div'>
          likes {blog.likes} <button className="like-button" onClick={() => addLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {(blog.user.username === user.username) && <div>
          <button className='remove-button' onClick={() => removeBlog(blog)}>remove</button>
        </div>}
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className="view-button" onClick={toggleFullDetails}>view</button>
    </div>
  )
}

export default Blog
