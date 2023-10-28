const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
    if (!blogs || blogs.length === 0) return {}
    let favorite = {likes: 0}
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}