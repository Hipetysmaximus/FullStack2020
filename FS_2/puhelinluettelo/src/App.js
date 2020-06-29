import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Number from './components/Number.js'
import Input from './components/Input.js'
import Button from './components/Button.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchParam, setSearchParam] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

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
    const Number = {
      name: newName,
      number: newNumber,
    }

    let nameList = []
    persons.forEach(person => nameList.push(person.name))

    if (nameList.indexOf(newName) > 0){
      window.alert(newName + ' is already in the phonebook')
    } else {
      setPersons(persons.concat(Number))
      setNewName("")
      setNewNumber("")
    }
  }

  const peopleToShow = false ? persons : persons.filter(person => person.name.includes(searchParam))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <Input value={searchParam}
        onChange={handleSearchChange}/>
      </div>
      <h2>add a new</h2>
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
        <Number key={person.name} person={person}/>
      )}
    </div>
  )

}

export default App