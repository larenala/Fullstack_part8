import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

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
      genres
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => 
    errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  if (!token && page === 'login') {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }
  

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
        
        { (!token) ? 
          <button onClick={() => setPage('login')}>login</button> 
          :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button> 
          </>
        }          
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

      <Query query={ALL_BOOKS} >
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