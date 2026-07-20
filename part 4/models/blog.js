const config=require('../utils/config')
const mongoose=require('mongoose')

blogSchema=mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedobject) => {
        returnedobject.id=returnedobject._id.toString()
        delete returnedobject._id
        delete returnedobject.__v
    }
})

module.exports=mongoose.model('Blog', blogSchema)