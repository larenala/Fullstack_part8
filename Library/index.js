const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

console.log('connecting to', config .mongoUrl)

mongoose.connect(config .mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]! 
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author")
      if (args.genre !== undefined) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
      name: (root) => root.name,
      id: (root) => root.id,
      born: (root) => root.born,
      bookCount: (root) => root.bookCount 
  },
  /*Book: {
    author: (root) => {
      return { 
        name: root.author,
        id: root.id
      }
    }
  },*/ 
  Mutation: {
    addBook: async (root, args) => {   
      let addedAuthor = await Author.findOne({ name: args.author })
      if (addedAuthor === null || addedAuthor === undefined ) {
        addedAuthor = new Author ({ 
          name: args.author, 
          born: null,
          bookCount: 0
        })
      }
      addedAuthor.bookCount = addedAuthor.bookCount+1
      
      await addedAuthor.save()
      let book = new Book ({ ...args })
      book.author = addedAuthor.id
      try {
        await book.save()
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }  
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author  
    }   
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})