import React from 'react'

let PeopleToShow = ({persons, searchParam}) => {
    return true ? persons : persons.filter(person => person.name.includes({searchParam}))
}

export default PeopleToShow