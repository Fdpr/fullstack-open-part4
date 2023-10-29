const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Why blogging is cool",
        author: "Mr Minit",
        url: "localhost",
        likes: 4
    },
    {
        title: "Cat food vs dog food",
        author: "The animal",
        url: "pets.net",
        likes: 2
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }