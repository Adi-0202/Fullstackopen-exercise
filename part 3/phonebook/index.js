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

app.get('/api/persons/:id', (request, response) => {
    const id=request.params.id
    console.log("id:", id)
    const person=Person.find().then(persons => {
        const person=persons.find(item => item.id==id)
        if(person){
            response.json(person)
        }
        else{
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id=request.params.id
    persons=persons.filter(item => item.id!=id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body=request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "The name or number is missing"
        })
    }
    Person.find().then(persons => {
        const exisistingPerson=persons.find(person => body.name===person.name)

        if(!exisistingPerson){
            const person= new Person({
            name: body.name,
            number: body.number
            })
            person.save().then(savedNote => response.json(savedNote))
        }
        else{
            return response.status(400).json({
                "error": "name must be unique"
            })
        }
    })
})

const unknownEndpoint=(request, response) => {
  response.status(404).send({error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT=process.env.PORT
app.listen(PORT,
    console.log(`Server is running on ${PORT}`)
)