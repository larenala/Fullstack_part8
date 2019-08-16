require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI
let jwtsecret = process.env.SECRET
module.exports = {
  mongoUrl, jwtsecret
}
