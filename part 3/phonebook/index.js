const express=require('express')
const app=express()
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const length=persons.length
    const time= new Date()
    response.send(
        `<p>Phonebook has info for ${length} people</p>
         <p>${time}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id=request.params.id
    const person=persons.find(item => item.id==id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id=request.params.id
    persons=persons.filter(item => item.id!=id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id=String(Math.floor(Math.random()*1000)+1)
    const body=request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "The name or number is missing"
        })
    }

    const exisistingPerson=persons.find(person => person.name===body.name)

    if(!exisistingPerson){
        const person={
        id:id,
        name: body.name,
        number: body.number
        }
        persons=persons.concat(person)
        response.json(person)
    }
    else{
        return response.status(400).json({
            "error": "name must be unique"
        })
    }
})

const PORT=3001
app.listen(PORT,
    console.log(`Server is running on ${PORT}`)
)