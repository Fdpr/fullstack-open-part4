const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)


describe("POST requesting a new user", () => {
    
    beforeEach(async () => {
        await User.deleteMany({})
    })
    

    test("saves the user if it is valid and returns statuscode 201", async () => {
        const usersBefore = await helper.usersInDb()
        const testUser = {
            username: "testUser",
            name: "I am test",
            password: "securo"
        }

        const response = await api
            .post("/api/users")
            .send(testUser)
            .expect(201)

        const receivedUser = response.body

        const usersNow = await helper.usersInDb()
        console.log(usersNow)
        expect(usersNow.length).toBe(usersBefore.length + 1)
        expect(receivedUser.name).toBe(testUser.name)
        expect(receivedUser.username).toBe(testUser.username)
    }, 100000)

    test("fails with statuscode 400 if no username is provided", async () => {
        const testUser = {
            name: "coolpeter",
            password: "1234"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
    }, 100000)

    test("fails with statuscode 400 if the username is too short", async () => {
        const testUser = {
            username: "pe",
            name: "Peter",
            password: "1234"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
    }, 100000)

    test("fails with statuscode 400 if the username is not unique", async () => {
        const testUser = {
            username: "peter",
            name: "Peter",
            password: "1234"
        }

        const testUser2 = {
            username: "peter",
            name: "Langley",
            password: "happydays"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(201)

        await api
            .post("/api/users")
            .send(testUser2)
            .expect(400)
    }, 100000)

    test("fails with statuscode 400 if no password is provided", async () => {
        const testUser = {
            username: "yesitme",
            name: "Secret Person"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
    }, 100000)

    test("fails with statuscode 400 if the password is too short", async () => {
        const testUser = {
            username: "collguy42",
            name: "Barbara Stein",
            password: "12"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
    }, 100000)
})

afterAll(async () => {
    await mongoose.connection.close()
})
