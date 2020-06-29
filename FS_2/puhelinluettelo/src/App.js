import React, { useState, useEffect} from 'react'
import Person from './components/Person.js'
import Input from './components/Input.js'
import Button from './components/Button.js'
import Filter from './components/Filter.js'
import peopleService from './services/People'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [searchParam, setSearchParam] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value)
  }
  
  const addNumber = (event) => {
    event.preventDefault()
    const Person = {
      name: newName,
      number: newNumber,
    }
    
    let names = persons.map(person =>person.name)
    
    if(names.includes(newName)){
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        const id = persons.filter(p => p.name === newName)[0].id
        peopleService
          .update(id, Person)
            .then(changedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : changedPerson))
              setSuccessMessage(
                `Person's '${newName}' number changed succesfully`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Failed to update number of '${newName}' to the database`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      peopleService
        .create(Person)
        .then(returnedPerson => {
          setPersons(persons.concat(Person))
          setSuccessMessage(
            `Person '${newName}' added successfully`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setErrorMessage(
            `Failed to add '${newName}' to the database`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  } 
    
  

  const deletePersonThis = id => {
    if (window.confirm('Are you sure you want to remove this contact?')){
      
      peopleService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(
            `User removed successfully`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `This person was already removed from the database`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const peopleToShow = persons.filter(person => person.name.includes(searchParam))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} notifClass='success'/>
      <Notification message={errorMessage} notifClass='error'/>

      <Filter value={searchParam} onChange={handleSearchChange}/>

      <h2>add a new number</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <Input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <Input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <Button type="submit" text='add' />
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map((person) =>
        <Person 
        key={person.name} 
        person={person}
        deletePerson={() => deletePersonThis(person.id)}/>
      )}
    </div>
  )

}

export default App