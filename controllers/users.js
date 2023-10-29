const bcrypt = require('bcrypt')
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get('/', async (request, response) => {
    const blogs = await User.find({})
    response.json(blogs)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.delete("/:id", async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

usersRouter.put("/:id", async (request, response) => {
    const newBlog = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    response.json(newBlog)
})

module.exports = usersRouter