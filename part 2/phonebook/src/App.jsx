import { use } from 'react'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      number:newNumber
    }
    let flag=false;
    for(const item of persons){
      if(item.name==newObj.name) {
        flag=true
        break
      }
    }
    if(flag) alert(`${newName} is already added to phonebook`)
    else setPersons(persons.concat(newObj))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNumbers}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>{persons.map(item => (
        <div key={item.name}>
          {item.name} {item.number}
        </div>
      ))}</>
    </div>
  )
}

export default App