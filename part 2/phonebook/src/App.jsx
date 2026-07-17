import { use } from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/filter"
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from "./services/serverHandling"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
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
    if(flag) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson=persons.find(item => item.name==newName)
        const changedPerson={...oldPerson, number:newNumber}

        personService
          .update(oldPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== oldPerson.id
                  ? person
                  : returnedPerson
              )
            )

            setNotification(
              `Number changed for ${changedPerson.name}`
            )
            setNotificationType("success")
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(`Information of ${changedPerson.name} has alredy been removed  from server`)
            setNotificationType("error")
            setPersons(persons.filter(person => person.id !== oldPerson.id))
            setTimeout(() => {
              setNotification(null)
            },5000)
          })
      setNewName('')
      setNewNumber('')
      }
    }
    else {
      personService
        .create(newObj)
        .then(obj => {
          setPersons(persons.concat(obj))
          setNotification(`Added ${obj.name}`)
          setNotificationType("success")

          setTimeout(() => {
            setNotification(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification(error.response.data.error)
          setNotificationType("error")
          setTimeout(() => {
            setNotification(null)
          },5000)
        })
    }
  }

  const filteredPersons=persons.filter(item => (
    item.name.toLowerCase().includes(filter.toLowerCase())
  ))

  const personDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(
            persons.filter(item => item.id !== person.id)
          )
        })
      setNotification(`Deleted ${person.name}`)
      setNotificationType("success")
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <div>
        <Filter  value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={handleNumbers} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} personDelete={personDelete}/>
    </div>
  )
}

export default App