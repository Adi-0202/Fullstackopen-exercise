import { use } from 'react'
import { useState } from 'react'
import Filter from "./components/filter"
import PersonForm from './components/personForm'
import Persons from './components/persons'

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
        <Filter  value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={handleNumbers} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App