const Blog = require('../models/blog')
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

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

const initialUsers = [
    {
        username: "Hein",
        name: "Hein Blöd",
        password: "Yarharhar"
    },
    {
        username: "Per",
        name: "Mister Minit",
        password: "goodonedude"
    },
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

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

const hashUser = async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const hashedUser = {
        username: user.username,
        name: user.name,
        passwordHash: passwordHash
    }
    return hashedUser
}

const getTokenOfFirstUser = async () => {
    const user = await User.findOne({username: initialUsers[0].username})
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, nonExistingId, getTokenOfFirstUser, hashUser }