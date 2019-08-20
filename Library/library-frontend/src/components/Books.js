import React, { useState } from 'react'

const Books = (props) => {
  const [ genre, setGenre ] = useState('')

  if (!props.show) {
    return null
  }
  const books = props.result.data.allBooks

  if (props.showFavorites ) {
    return (
      <div>
        <h2>recommendations</h2>
      </div>
    )   
  }

  const findGenres = () => {
    let genres = []
    books.map(b => b.genres.map(genre => {
    if (!genres.includes(genre)) {
      genres = genres.concat(genre)
    }
  }))
    return genres
  }

  const handleClick = (e) => {
    if (e.target.value === 'all') {
      setGenre('')
      props.setShowAll(true)
    } else {
      props.setShowAll(false)
      setGenre(e.target.value)
    }
  }

  return (
    <div>
      <h2>books</h2>
      { props.showAll ? <></> : <p>in genre <strong>{ genre }</strong></p>} 
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.showAll ? 
          books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ) : 
            books.map(book =>  {
              if (book.genres.includes(genre)) {
                return (                   
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                  
                )
              }
            }
            )
          }
        </tbody>
      </table>
    {findGenres().map(g => <button key={g} type='submit' value={g} onClick={ handleClick }>{g}</button>)}
    <button key="all" id="findAll" type="submit" value='all' onClick={ handleClick }>all genres</button>
    </div>
  )
}

export default Books