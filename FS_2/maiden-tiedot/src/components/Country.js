import React from 'react'

const Country = ({value, onButtonPress}) => {
    return (
        <li>
            {value}
            <button onClick={onButtonPress}>show</button>
        </li>
    )
}

export default Country