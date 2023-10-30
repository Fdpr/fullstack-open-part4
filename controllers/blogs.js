const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: "no or invalid user token given" })
    }
    const blog = new Blog({ ...request.body, user: user._id })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: "no user token given" })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(204).end()
    }
    else if (blog.user._id.toString() === user._id.toString()) {
        await Blog.deleteOne({ _id: request.params.id })
        return response.status(204).end()
    } else
        response.status(401).json({ error: "user not authorized to delete this blog" })
})

blogsRouter.put("/:id", async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: "no user token given" })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(204).end()
    }
    else if (blog.user._id.toString() === user._id.toString()) {
        const newBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
        response.json(newBlog)
    } else
        response.status(401).json({ error: "user not authorized to delete this blog" })

})

module.exports = blogsRouter