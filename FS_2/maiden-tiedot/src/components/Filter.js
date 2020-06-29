import React from 'react'
import Input from './Input'

const Filter = ({value, onChange}) => {
    return <div>
    find countries <Input value={value}
    onChange={onChange}/>
  </div>
}

export default Filter