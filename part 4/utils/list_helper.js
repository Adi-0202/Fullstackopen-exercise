const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const totalLikes = (sum, item) => {
        return sum + item.likes
    }

    return array.length===0? array.length: array.reduce(totalLikes, 0)
}

const favouriteBlog = (array) => {
    let max = 0
    let maxIndex = 0

    for (const [index, item] of array.entries()) {
        if (item.likes > max) {
            max = item.likes
            maxIndex = index
        }
    }

    return array.length===0? array.length: array[maxIndex]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    const result = _.chain(blogs)
        .countBy('author')
        .toPairs()
        .maxBy(pair => pair[1])
        .value()

    return {
        author: result[0],
        blogs: result[1],
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return null
    }

    return _.chain(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author,
            likes: _.sumBy(blogs, 'likes')
        }))
        .maxBy('likes')
        .value()
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}