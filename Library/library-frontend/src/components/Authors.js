import React from 'react'
import EditAuthor from './EditAuthor';
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Authors = (props) => {
  const UPDATE_AUTHOR=gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
  
  `

  const authors = props.result.data.allAuthors
  
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: props.handleError
  })

  if (!props.show ) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }
  
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <EditAuthor 
        updateAuthor={updateAuthor}
        authors={authors}
      />
        
        
      
    </div>
  )
}

export default Authors