import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            id='title-input'
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={e => setNewAuthor(e.target.value)}
            id='author-input'
          />
        </div>
        <div>
          url:
          <input
            value={newURL}
            onChange={e => setNewURL(e.target.value)}
            id='url-input'
          />
        </div>

        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
