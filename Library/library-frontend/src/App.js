import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const App = () => {
  const [page, setPage] = useState('authors')

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
      author
      published
      id
    }
  }
  `
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => <Authors result={result} show={page === 'authors'}/>}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => <Books
          result={result}
          show={page === 'books'}
        /> }
      </Query>
      

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App