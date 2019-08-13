import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const options=props.authors.map(a => ({value: a.name, label: a.name}))

  const submit = async (e) => {
    e.preventDefault()
    
    await props.updateAuthor({
        variables: { name, born }
    })
    setSelectedOption('')
    setName('')
    setBorn('')
  }

  const handleChange= selectedOption => {
    setSelectedOption({selectedOption})
    const selectedName = selectedOption.value
    setName(selectedName)
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const width = 'width: 200';
      return { ...provided, opacity, transition, width };
    }
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