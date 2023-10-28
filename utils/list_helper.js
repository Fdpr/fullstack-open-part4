var _ = require("lodash")

const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
    if (!blogs || blogs.length === 0) return {}
    let favorite = { likes: 0 }
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes)
            favorite = blog
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0)
        return {}
    else return _(blogs)
        .groupBy("author")
        .map((objs, key) => ({
            'author': key,
            'blogs': objs.length
        }))
        .maxBy(author => author.blogs)
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0)
        return {}
    else return _(blogs)
        .groupBy("author")
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes')
        }))
        .maxBy(author => author.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}