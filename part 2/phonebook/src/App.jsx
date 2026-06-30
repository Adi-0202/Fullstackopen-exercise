import { use } from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/filter"
import PersonForm from './components/personForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  },[])

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
      //id:persons.length+1 server will handle id generation
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
    axios
      .post("http://localhost:3001/persons", newObj)
      .then(response => {
        setPersons(persons.concat(newObj))
      })
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
      <Persons filteredPersons={filteredPersons} key={filteredPersons.id} />
    </div>
  )
}

export default App