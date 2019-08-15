require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI

module.exports = {
  mongoUrl,
}
