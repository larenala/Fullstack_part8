import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const ALL_AUTHORS= gql`
  {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
  `

  const ALL_BOOKS = gql`
  {
    allBooks  {
      title
      author {
        name
        id
      }
      published
      id
    }
  }
  `
  const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author:  $author,
      published: $published,
      genres: $genres,
    ) {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
  `

  

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS} pollInterval={2000} >
        {(result) => 
          <Authors 
            result={ result } 
            show={page === 'authors'}
            handleError={ handleError }
          />
        }
      </Query>

      <Query query={ALL_BOOKS} pollInterval={2000}>
        {(result) => <Books
          result={result}
          show={page === 'books'}
        /> }
      </Query>
      
      <Mutation mutation={CREATE_BOOK} onError={handleError} refetchQueries={[{ query: ALL_BOOKS }]}>
        {(addBook) => 
          <NewBook
            show={page === 'add'}
            addBook={addBook}
            
          />
        }
      </Mutation>
    </div>
  )
}

export default App