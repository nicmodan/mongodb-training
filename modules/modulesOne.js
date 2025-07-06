const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
	"name" : String,
	"dateOfBirth" : Date, 
	"email": String,
	"placeOfBirth" : String, 
	"profession" : String,
	"age": Number,
	"firstName": String,
	"active": Boolean,
	"classNames": [String],
	"classInfo": {
		"classNames": String
	}
	
})

adminSchema.set("toJSON", {
	transform: (document, returnedObject) =>{
		returnedObject.id = returnedObject._id.toString()
		// delete returnedObject._id
      	// delete returnedObject.__v
	}
})
const StudentAdmin = mongoose.model("StudentAdmin", adminSchema)

module.exports = StudentAdmin