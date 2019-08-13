import React from 'react'
import EditAuthor from './EditAuthor';
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const Authors = (props) => {

  const UPDATE_AUTHOR=gql`
  mutation updateAuthor($name: String!, $born: Int) {
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

  if (!props.show) {
    return null
  }
  console.log('props ', props)
  if (props.result.loading) {
    return <div>loading...</div>
  }
  const authors = props.result.data.allAuthors


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
      <Mutation mutation={UPDATE_AUTHOR}>
        {(updateAuthor) => 
          <EditAuthor 
            updateAuthor={updateAuthor}
            authors={authors}
          />
        }
      </Mutation>
    </div>
  )
}

export default Authors