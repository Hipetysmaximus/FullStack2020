import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value)
  }

  console.log(countries)

  const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(searchParam))

  console.log(countriesToShow)

  return (
    <div>

      <Filter value={searchParam} onChange={handleSearchChange}/>

      <Countries value={countriesToShow}/>
      
    </div>
  )
}

export default App 