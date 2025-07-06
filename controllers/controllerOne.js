const express = require("express")
const studentRouter = express.Router()
const studentModule = require("../modules/modulesOne.js")
const axios = require("axios")
const logger = require("../utiles/logger")

// 09011384322
studentRouter.post("/", async(req, res)=>{
	const inistallData = {
		"name" : " oluwatosin.A",
		"dateOfBirth" : new Date(),
		"email": "oluwatosin321@modanmic.com", 
		"placeOfBirth" : "Lagos State Nigeria", 
		"profession" : "Sales Staff",
		"age": 50
	}

	const productionData = {
		"name" : "Michael.A",
		"dateOfBirth" : new Date(),
		"email": "michael@modanmic.com", 
		"placeOfBirth" : "Lagos State Nigeria", 
		"profession" : "Faculty Staff",
		"age": 30
	}
	// const inistallData01 = {
	// 	"name" : "Michael oluwatosin.A",
	// 	"dateOfBirth" : new Date(),
	// 	"email": "michaeloluwatosin321@modanmic.com", 
	// 	"placeOfBirth" : "Ogune State Nigeria", 
	// 	"profession" : "Production Staff",
	// 	"age": 20
	// }

	// const productionData01 = {
	// 	"name" : "Michael oluwatosin.A",
	// 	"dateOfBirth" : new Date(),
	// 	"email": "michaeloluwatosin321@modanmic.com", 
	// 	"placeOfBirth" : "Ogune State Nigeria", 
	// 	"profession" : "Production Staff",
	// 	"age": 30
	// }

	const insetData = [inistallData, productionData]

	// const InsetedResulte = insetData.map(async(val, idx)=>{
	// 	const setNewData = new studentModule(inistallData)
	// 	const getCurrentData = await setNewData.save()
	// })
	const InsetedResulte = await Promise.all(
	    insetData.map(async (val, idx) => {
	      const setNewData = new studentModule(val);
	      const getCurrentData = await setNewData.save();
	      return getCurrentData;
	    })
	);

	console.log(InsetedResulte)

	// Simple success condition check
	if (InsetedResulte && InsetedResulte.length === insetData.length) {
		res.status(200).send({message: "Data Inseted Succefull"})
	  // console.log("✅ All data inserted successfully.");
	} else {
		res.status(500).send({message: "Network Error"})
	  // console.log("⚠ Some data may not have been inserted.");
	}
	

	
	// res.status(200).send({message: inistallData})
	
})

studentRouter.get("/findOne/:email", async(req, res)=>{
	const email = req.params.email
	console.log(email)
	const mainUser = await studentModule.findOne({email: email})
	// const setNewData = new studentModule(inistallData)
	if(!mainUser?.email){
		return res.status(500).send({error: "INVALIDE USER EMAIL"})
	}
	const getCurrentData = await mainUser.save()

	return res.status(200).send({message: "Data Recived", currentData: getCurrentData})
})

studentRouter.get("/findAll", async(req, res)=>{
	// STEP ONE 
	const mainUser = await studentModule.find({}) // .limit(2) 

	//distinct("email")//.find()//.limit(2) // find() // distinct("email")
	// STEP TWO
	return res.status(200).send({message: "Data Recived", currentData: mainUser})
})

studentRouter.get("/quaryDataByAgeRouter/:id", async(req, res)=>{
	const age = req.params.id
	// console.log(age)
	// STEP ONE 
	const mainUser = await studentModule.find({age: {
		$gt: 20
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/quaryDataByProfessionRouter", async(req, res)=>{
	const age = req.params.id
	// console.log(age)
	// STEP ONE 
	const mainUser = await studentModule.find({profession: {
		$in: ["Sales Staff"]
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/quaryDataByEqalseAgeRouter", async(req, res)=>{
	const age = req.params.id
	// console.log(age)
	// STEP ONE  .find({age: { $eq: 30}})
	const mainUser = await studentModule.find({age: {
		$ne: 20
	}}).limit(2)

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/regexQueryOne", async(req, res)=>{
	
	// console.log(age)
	// STEP ONE  .find({age: { $eq: 30}})
	const mainUser = await studentModule.find({'placeOfBirth': {
		$regex: /^Og/
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/regexQueryTwo", async(req, res)=>{
	
	// console.log(age)
	// STEP ONE  .find({age: { $eq: 30}})
	const mainUser = await studentModule.find({'placeOfBirth': {
		$regex: /yourk$/
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/regexQueryThree", async(req, res)=>{
	
	// console.log(age)
	// STEP ONE  .find({age: { $eq: 30}})
	const mainUser = await studentModule.find({'profession': {
		$regex: /^Boxer$/
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

studentRouter.get("/regexQueryFour", async(req, res)=>{
	
	// console.log(age)
	// STEP ONE  .find({age: { $eq: 30}})
	const mainUser = await studentModule.find({'email': {
		$regex: /@modanmic\.com$/
	}})

	return res.status(200).send({message: "Data Recived", mainUser: mainUser})
		// , currentData: newResulte})
})

module.exports = studentRouter