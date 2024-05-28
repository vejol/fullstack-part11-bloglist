import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls the callback function with correct parameters when form is submitted', async () => {

  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const user = userEvent.setup()
  const button = screen.getByText('create')

  await user.type(titleInput, 'This is blog title')
  await user.type(authorInput, 'Arthur Author')
  await user.type(urlInput, 'titlestomake.com')

  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('Arthur Author')
  expect(createBlog.mock.calls[0][0].url).toBe('titlestomake.com')

})