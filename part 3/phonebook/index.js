require('dotenv').config()
const express=require('express')
const app=express()
const morgan=require('morgan')
//const cors=require('cors')
const Person=require('./models/person')
app.use(express.json())
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//app.use(cors())
app.use(express.static('dist'))
/*
let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    Person.find().then(persons => {
        const length=persons.length
        //console.log(length)
        const time = new Date()

        response.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${time}</p>
    `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id=request.params.id
    Person.findById(id)
        .then(person => {
            if(person){
                response.json(person)
            }
            else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    const id=request.params.id
    Person.findByIdAndDelete(id)
        .then(retult => {
            response.status(204).end()
        })
        .catch(error => console.log('error:', error.message))
})

app.post('/api/persons', (request, response) => {
    const body=request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "The name or number is missing"
        })
    }
    const person= new Person({
        name: body.name,
        number: body.number
        })
    person.save().then(savedNote => response.json(savedNote))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body=request.body
    const id=request.params.id
    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "The name or number is missing"
        })
    }
    Person.findById(id)
        .then(person => {
            if(!person){
                return response.status(404).end()
            }
            person.number=body.number
            return person.save().then(updatedNote => response.json(updatedNote))
        })
        .catch(error => next(error))
})

const unknownEndpoint=(request, response) => {
  response.status(404).send({error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name=="CatchError"){
        return response.status(400).send({error: "malformed id"})
    }
    next(error)
}

app.use(errorHandler)

const PORT=process.env.PORT
app.listen(PORT,
    console.log(`Server is running on ${PORT}`)
)