const config=require('../utils/config')
const mongoose=require('mongoose')

blogSchema=mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    likes: Number,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

blogSchema.set('toJSON', {
    transform: (document, returnedobject) => {
        returnedobject.id=returnedobject._id.toString()
        delete returnedobject._id
        delete returnedobject.__v
    }
})

module.exports=mongoose.model('Blog', blogSchema)