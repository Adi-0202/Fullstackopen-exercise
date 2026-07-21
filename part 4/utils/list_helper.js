const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const totalLikes = (sum, item) => {
        return sum + item.likes
    }

    return array.length===0? array.length: array.reduce(totalLikes, 0)
}

module.exports = { dummy, totalLikes }