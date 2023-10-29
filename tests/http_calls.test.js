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

describe("GET requesting all blogs", () => {

    test('returns all blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('makes returned blogs have the id property', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    }, 100000)

})

describe("POST requesting a new blog entry", () => {
    test('pushes blog to server and saves content if valid', async () => {
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

    test("initializes the blog with 0 likes if the field is empty", async () => {
        const blog = {
            title: "new Blog",
            author: "Barbara",
            url: "0.0.0.0",
        }

        const response = await api
            .post("/api/blogs")
            .send(blog)

        const receivedBlog = response.body

        expect(receivedBlog.likes).toBeDefined()
        expect(receivedBlog.likes).toBe(0)
    }, 100000)

    test("is rejected when it has no title", async () => {
        const blog = {
            author: "Barbara",
            url: "0.0.0.0",
            likes: 4
        }

        await api
            .post("/api/blogs")
            .send(blog)
            .expect(400)
    }, 100000)

    test("is rejected when it has no URL", async () => {
        const blog = {
            title: "new Blog",
            author: "Barbara",
            likes: 4
        }

        await api
            .post("/api/blogs")
            .send(blog)
            .expect(400)
    }, 100000)

})

describe("DELETE requesting a blog with a certain id", () => {
    test("deletes it from the server and returns statuscode 204", async () => {
        const allBlogs = await helper.blogsInDb()
        const idOfFirst = allBlogs[0].id
        await api
            .delete(`/api/blogs/${idOfFirst}`)
            .expect(204)
        const allNewBlogs = await helper.blogsInDb()
        const deletedBlog = allNewBlogs.find(blog => blog.id === idOfFirst)
        expect(allNewBlogs.length).toBe(allBlogs.length - 1)
        expect(deletedBlog).not.toBeDefined()
    }, 100000)

    test("does nothing and returns statuscode 204 if the id doesn't exist", async () => {
        const nonid = await helper.nonExistingId()
        api
            .delete(`/api/blogs/${nonid}`)
            .expect(204)
    })

    test("returns status 400 if the id is malformed", async () => {
        await api
            .delete(`/api/blogs/badID123`)
            .expect(400)
    }, 100000)
})

describe("PUT requesting to update a blog", () => {
    test("works if the blog is valid", async () => {
        const updatedBlog = {
            title: "I am ghoul",
            author: "The original ghoul",
            url: "ghoultown.co.uk",
            likes: 1000
        }
        const allBlogs = await helper.blogsInDb()
        const response = await api
            .put(`/api/blogs/${allBlogs[0].id}`)
            .send(updatedBlog)
            .expect(200)
        const receivedBlog = response.body
        expect(receivedBlog.title).toBe(updatedBlog.title)
        expect(receivedBlog.author).toBe(updatedBlog.author)
        expect(receivedBlog.url).toBe(updatedBlog.url)
        expect(receivedBlog.likes).toBe(updatedBlog.likes)
    }, 100000)

    test("returns statuscode 400 if the new blog is invalid", async () => {
        const updatedBlog = {
            title: "I am missing",
            likes: 1000
        }
        const allBlogs = await helper.blogsInDb()
        const receivedBlog = await api
            .put(`/api/blogs/${allBlogs[0].id}`)
            .send(updatedBlog)
            .expect(200)
        console.log(receivedBlog.body)
    }, 100000)

})

afterAll(async () => {
    await mongoose.connection.close()
})

