const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const emptyBlogList = []
    expect(totalLikes(emptyBlogList)).toBe(0)
  })

  test('equals likes of a blog when list has only one blog', () => {
    const oneBlogList = [blogs[0]]
    expect(totalLikes(oneBlogList)).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(blogs)).toBe(36)
  })
})

describe('Favorite blog', () => {
  test('of empty list is null', () => {
    const emptyBlogList = []
    expect(favoriteBlog(emptyBlogList)).toBe(null)
  })

  test('is a blog itself when list has only one blog', () => {
    const oneBlogList = [blogs[0]]

    const expectedResult = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }

    expect(favoriteBlog(oneBlogList)).toEqual(expectedResult)
  })

  test('of a bigger list is calculated right', () => {
    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    expect(favoriteBlog(blogs)).toEqual(expectedResult)
  })
})

describe('Most blogs', () => {
  test('object is null if list is empty', () => {
    expect(mostBlogs([])).toBe(null)
  })

  test('is for only author if list has only one blog', () => {
    const oneBlogList = [blogs[0]]

    const expectedResult = {
      author: 'Michael Chan',
      blogs: 1
    }
    expect(mostBlogs(oneBlogList)).toEqual(expectedResult)
  })

  test('counts blogs right when there are many blogs', () => {
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(mostBlogs(blogs)).toEqual(expectedResult)
  })
})

describe('Most likes', () => {
  test('object is null if list is empty', () => {
    expect(mostLikes([])).toBe(null)
  })

  test('mathes with a blog likes if list has only one blog', () => {
    const oneBlogList = [blogs[0]]

    const expectedResult = {
      author: 'Michael Chan',
      likes: 7
    }
    expect(mostLikes(oneBlogList)).toEqual(expectedResult)
  })

  test('is calculated right when there are many blogs in list', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(mostLikes(blogs)).toEqual(expectedResult)
  })
})
