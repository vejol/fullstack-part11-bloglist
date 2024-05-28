import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Writing test blogs',
  author: 'Timo Tester',
  url: 'www.testblogs.com',
  likes: 3,
  user: {
    id: 1234,
    name: 'Bertta Bloguser'
  }
}

const user = {
  id: 1234,
  username: 'berttab',
  name: 'Bertta Bloguser',
}

const mockAddLike = vi.fn()

test('renders title and author but not url nor likes as default', async () => {

  render(<Blog blog={blog} />)

  screen.getByText('Writing test blogs', { exact: false })
  screen.getByText('Timo Tester', { exact: false })

  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()

  const likes = screen.queryByText(blog.likes)
  expect(likes).toBeNull()
})

test('renders all fields after view button is pressed', async () => {

  render(<Blog blog={blog} user={user} />)

  const testUser = userEvent.setup()
  const button = screen.getByText('view')
  await testUser.click(button)

  screen.getByText('Writing test blogs', { exact: false })
  screen.getByText('Timo Tester', { exact: false })
  screen.getByText('www.testblogs.com', { exact: false })
  screen.getByText('likes 3', { exact: false })
})

test('calls event handler twice when like button is pressed twice', async () => {

  render(<Blog blog={blog} user={user} addLike={mockAddLike} />)

  const testUser = userEvent.setup()

  const viewButton = screen.getByText('view')
  await testUser.click(viewButton)

  const likeButton = screen.getByText('like')
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)
})
