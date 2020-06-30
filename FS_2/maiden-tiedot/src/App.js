import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import Language from './components/Language'

const Countries = ({value, onButtonPress}) => {
  console.log(value)
  if (value.length > 10){
      return <p>Too many matches, specify another filter</p>
  } else if (value.length < 11 && value.length > 1){
      return (<div>
          {value.map(v =>
              <Country 
                  key={v.alpha2Code} 
                  value={v.name}
                  onButtonPress={() => onButtonPress(v.name)} 
              />
          )}
      </div>)
  } else if (value.length === 1) {
      

      return (
      <div>
          <h1>{value[0].name}</h1>
          <p>Capital: {value[0].capital}</p>
          <p>Population: {value[0].population}</p>
          <h2>Languages</h2>
          <ul>
              {value[0].languages.map((l, i) =>
                  <Language key={i} value={l.name}/>
              )}
          </ul>
          <img src={value[0].flag} width="100" height="80"></img>
          <h2>Weather in {value[0].capital}</h2>
      </div>
      )
  } else {
      return <p>No countries found</p>
  }
}

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

  const handleButtonPress = (name) => {
    console.log(name)
    setSearchParam(name)
  }

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value)
  }

  const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(searchParam.toLowerCase()))

  return (
    <div>

      <Filter value={searchParam} onChange={handleSearchChange}/>

      <Countries 
        value={countriesToShow}
        onButtonPress={() => handleButtonPress()}  
      />
      
    </div>
  )
}

export default App 