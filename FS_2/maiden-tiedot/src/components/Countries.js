import React from 'react'
import Country from './Country'
import Language from './Language'

const Countries = ({value}) => {
    console.log(value)
    if (value.length > 10){
        return <p>Too many matches, specify another filter</p>
    } else if (value.length < 11 && value.length > 1){
        return (<div>
            {value.map(v =>
                <Country key={v.alpha2Code} value={v.name}/>
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

export default Countries