import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumbers = (event) => {
    event.preventDefault()
    console.log(newName)
    const newObj={
      name:newName,
    }
    setPersons(persons.concat(newObj))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNumbers}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>{persons.map(item => (
        <div key={item.name}>
          {item.name}
        </div>
      ))}</>
    </div>
  )
}

export default App