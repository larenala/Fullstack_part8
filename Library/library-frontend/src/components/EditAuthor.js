import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const options=props.authors.map(a => ({value: a.name, label: a.name}))

  const submit = async (e) => {
    e.preventDefault()
    setSelectedOption('')
    await props.updateAuthor({
        variables: { name, born }
    }) 
    setName('')
    setBorn('')
  }

  const handleChange= selectedOption => {
    setSelectedOption({selectedOption})
    const selectedName = selectedOption.value
    setName(selectedName)
  }

  return (
    <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          name
          <Select
            value={selectedOption.value}
            onChange={handleChange}
            options={options}
        /><br/>
          born
          <input 
            type='number' 
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          /><br/>
          <input type='submit' value='update author' />
        </form>
      </div>
      
  )
  
}
export default EditAuthor