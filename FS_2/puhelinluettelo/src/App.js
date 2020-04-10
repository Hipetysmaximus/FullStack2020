import React, { useState } from 'react'
import Number from './components/Number.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchParam, setSearchParam] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
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
        filter shown with: <input value={searchParam}
        onChange={handleSearchChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
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