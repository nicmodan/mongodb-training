require("dotenv").config()

const port = process.env.PORT
const mongoURL = process.env.MONGODB_URL

module.exports = {
	port,
	mongoURL
}