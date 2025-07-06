const express = require("express")
const studentRouter = express.Router()
const studentModule = require("../modules/modulesOne.js")
const axios = require("axios")
const logger = require("../utiles/logger")


studentRouter.get("/insertMany", async(req, res)=>{
	// DATA TO INSERT ONE 
	const insertOneData = {
		"name" : "Mike Tasin",
		"dateOfBirth" : new Date(), 
		"email": "miketasin@modanmic.com",
		"placeOfBirth" : "New yourk", 
		"profession" : "Boxer",
		"age": 55
	}

	const mainUser = await studentModule.insertMany([insertOneData])

	return res.status(200).send({message: "Data One Success Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/deleteOne", async(req, res)=>{
	
	const mainUser = await studentModule.deleteOne({age: 52})

	return res.status(200).send({message: "Data One Deleted Succes-Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/deleteMany", async(req, res)=>{
	

	const mainUser = await studentModule.deleteMany({age: {$eq: 40} })

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.post("/findOneAndReplace", async(req, res)=>{
	

	const mainUser = await studentModule.findOneAndReplace({age: 40 },
															{
																age: 42,
															  "name": "oluwatosin.A",
														      "dateOfBirth": "2025-06-20T16:00:55.977Z",
														      "email": "oluwatosin321@modanmic.com",
														      "placeOfBirth": "Lagos State Nigeria",
														      "profession": "Sales Staff"

															},

															{ new: false }
														)

	return res.status(200).send({message: "Data Replaced Success Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/addNewFiled", async(req, res)=>{
	

	const mainUser = await studentModule.updateMany(
														   {firstName: undefined }, // QUERY CONDITION
														   {$set: {"firstName": "dami"}}, // UPDATE EXPRETIO N
														   {upsert: true} // OPTION PARAMETER
														  )

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/removeNewFiled", async(req, res)=>{
	

	const mainUser = await studentModule.updateMany(
													   {age: 20 },
													   {$unset: {"age": ""}},
													  )

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/assendingData", async(req, res)=>{
	

	const mainUser = await studentModule.find().sort({"age": 1})

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})

		// , currentData: newResulte})
})

studentRouter.get("/desendingData", async(req, res)=>{
	

	const mainUser = await studentModule.find().sort({"age": -1})

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})

		// , currentData: newResulte})
})


studentRouter.get("/averageAgePro", async(req, res)=>{
	

	const mainUser = await studentModule.aggregate([
													  { $match: { profession: "Sales Staff" } },
													  {
													    $group: {
													      _id: '$profession',
													      totalAvgAgeSalesStaff: { $sum: "$age" }
													    }
													  }
													])

	return res.status(200).send({message: "Data All Success Fully Inseted!", mainUser: mainUser})

		// , currentData: newResulte})
})
// .aggregate([
//   { $match: { status: "delivered" } },
//   {
//     $group: {
//       _id: null,
//       totalRevenue: { $sum: "$amount" }
//     }
//   }
// ])

module.exports = studentRouter
