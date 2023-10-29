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

const nonExistingId = async () => {
    const blog = new Blog({
        title: "I will",
        author: "be deleted",
        url: "very soon",
        likes: 0
    })
    await blog.save()
    await Blog.deleteOne({ id: blog.id })

    return blog.id.toString()
}

module.exports = { initialBlogs, blogsInDb, nonExistingId }