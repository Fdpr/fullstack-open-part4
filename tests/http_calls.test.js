const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('GET /api/blogs returns all blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('blogs have id property', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
}, 100000)

test('POST api/blogs pushes blog to server and saves content', async () => {
    const blog = {
        title: "new Blog",
        author: "Barbara",
        url: "0.0.0.0",
        likes: 4
    }

    const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const receivedBlog = response.body

    const allBlogsNow = await helper.blogsInDb()
    expect(allBlogsNow.length).toBe(helper.initialBlogs.length + 1)
    expect(receivedBlog.title).toBe(blog.title)
    expect(receivedBlog.author).toBe(blog.author)
    expect(receivedBlog.url).toBe(blog.url)
    expect(receivedBlog.likes).toBe(blog.likes)
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})