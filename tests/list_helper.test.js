const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    const longList = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 3,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d67b4ae6757c9e975e1e0",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d67baae6757c9e975e1e2",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 10,
            "__v": 0
        },
        {
            "_id": "653d6d0b6ed88f306a2f99de",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 15,
            "__v": 0
        }
    ]
    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(longList)).toBe(40)
    })
})