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

describe("favorite blog", () => {
    test('of an empty list', () => expect(listHelper.favoriteBlog([])).toEqual({}))

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

    test('of a list with one entry', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
            title: listWithOneBlog[0].title,
            author: listWithOneBlog[0].author,
            likes: listWithOneBlog[0].likes
        })
    })

    const normalList = [
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
            "title": "I am another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 2,
            "__v": 0
        }
    ]

    test("of a list with some entries", () => {
        expect(listHelper.favoriteBlog(normalList)).toEqual({
            title: normalList[1].title,
            author: normalList[1].author,
            likes: normalList[1].likes
        })
    })

    const listWithTie = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        }
    ]

    test("of a list with a tie", () => {
        expect(listHelper.favoriteBlog(listWithTie)).toEqual({
            title: listWithTie[0].title,
            author: listWithTie[0].author,
            likes: listWithTie[0].likes
        })
    })
})

describe("most blogs", () => {
    test("of an empty list", () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
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

    test("of a list with one entry", () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
            author: listWithOneBlog[0].author,
            blogs: 1
        })
    })

    const listWithMultiples = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am another blog",
            "author": "Per",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        }
    ]

    test("of a list with multiple blogs by the same author", () => {
        expect(listHelper.mostBlogs(listWithMultiples)).toEqual({
            author: "Mister Minit",
            blogs: 2
        })
    })

    const listWithTie = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am another blog",
            "author": "Per",
            "url": "localhost",
            "likes": 8,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0g2447ff7b298g394",
            "title": "I am unimportant",
            "author": "Heino",
            "url": "localhost",
            "likes": 2,
            "__v": 0
        },
        {
            "_id": "1jd9635d355558dkc18c39e9",
            "title": "I am important",
            "author": "Per",
            "url": "localhost",
            "likes": 1,
            "__v": 0
        },
    ]

    test("of a list with a tie", () => {
        const result = listHelper.mostBlogs(listWithTie)
        expect(["Mister Minit", "Per"]).toContain(result.author)
        expect(result.blogs).toBe(2)
    })

})

describe("most likes", () => {
    test("of an empty list", () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })
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

    test("of a list with one entry", () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
            author: listWithOneBlog[0].author,
            likes: listWithOneBlog[0].likes
        })
    })

    const listWithMultiples = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am another blog",
            "author": "Per",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        }
    ]

    test("of a list with multiple blogs by the same author", () => {
        expect(listHelper.mostLikes(listWithMultiples)).toEqual({
            author: "Mister Minit",
            likes: 8
        })
    })

    const listWithTie = [
        {
            "_id": "653d623e6c9f6b487612fd23",
            "title": "I am test blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d635d35555dd4c18c39e9",
            "title": "I am another blog",
            "author": "Per",
            "url": "localhost",
            "likes": 8,
            "__v": 0
        },
        {
            "_id": "653d64d0624f7ff7b298a292",
            "title": "I am yet another blog",
            "author": "Mister Minit",
            "url": "localhost",
            "likes": 4,
            "__v": 0
        },
        {
            "_id": "653d64d0g2447ff7b298g394",
            "title": "I am unimportant",
            "author": "Heino",
            "url": "localhost",
            "likes": 2,
            "__v": 0
        }
    ]

    test("of a list with a tie", () => {
        const result = listHelper.mostLikes(listWithTie)
        expect(["Mister Minit", "Per"]).toContain(result.author)
        expect(result.likes).toBe(8)
    })

})