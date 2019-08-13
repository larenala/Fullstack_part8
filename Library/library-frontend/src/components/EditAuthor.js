import React, { useState } from 'react'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = props.authors


  const submit = async (e) => {
    e.preventDefault()
    await props.updateAuthor({
        variables: { name, born }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          name
          <input 
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
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