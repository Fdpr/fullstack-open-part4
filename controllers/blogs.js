const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const users = await User.find({})
    //This is randomness to be deleted in 4.19
    const whichUser = users[Math.floor(Math.random() * users.length)]
    const blog = new Blog({...request.body, user: whichUser._id})

    const result = await blog.save()

    whichUser.blogs = whichUser.blogs.concat(result._id)
    await whichUser.save()
    response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    response.json(newBlog)
})

module.exports = blogsRouter