import { use } from 'react'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNumbers = (event) => {
    event.preventDefault()
    console.log(newName)
    const newObj={
      name:newName,
      number:newNumber,
      id:persons.length+1
    }
    let flag=false;
    for(const item of persons){
      if(item.name==newObj.name) {
        flag=true
        break
      }
    }
    if(flag) alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat(newObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons=persons.filter(item => (
    item.name.toLowerCase().includes(filter.toLowerCase())
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input  value={filter}  onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleNumbers}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>{filteredPersons.map(item => (
        <div key={item.id}>
          {item.name} {item.number}
        </div>
      ))}</>
    </div>
  )
}

export default App