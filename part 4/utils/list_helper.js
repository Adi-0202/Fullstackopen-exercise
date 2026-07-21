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

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }