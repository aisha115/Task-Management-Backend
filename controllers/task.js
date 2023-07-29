const { BadRequestError } = require("../errors/index");
const task = require('../models/task')

const test = async(req,res)=>{
  res.json({res:"Hello"})
}

const addTask = async(req,res)=>{
  const {title,description,due_date,priority,date} = req.body
  if(!title || !description || !due_date || !priority || !date){
    throw new BadRequestError("Please provide required fields")
  }
  const response = await task.create(req.body)
  res.status(200).json({res:"Success",data:response})
}

const deleteTask = async(req,res)=>{
  const {tid} = req.params
  const resp = await task.findOne({_id:tid})
  if(!resp){
    throw BadRequestError("Please provide valid ID")
  }
  const response = await task.findOneAndDelete({_id:tid})
  res.status(200).json({res:"Success",data:response})
}

const getAllToDo = async(req,res)=>{
  console.log("hekko");
  const resp = await task.find({status:"TO DO"})
  res.status(200).json({res:"Success",data:resp})
}

const getAllInProgress = async(req,res)=>{
  const resp = await task.find({status:"IN PROGRESS"})
  res.status(200).json({res:"Success",data:resp})
}

const getAllDone = async(req,res)=>{
  const resp = await task.find({status:"DONE"})
  res.status(200).json({res:"Success",data:resp})
}

const modifyTask = async(req,res)=>{
  const {tid} = req.params
  const {title,description,due_date,priority,date} = req.body
  if(!title || !description || !due_date || !priority || !date){
    throw new BadRequestError("Please provide required fields")
  }
  const response = await task.findOne({_id:tid})
  const modifydate = new Date(). toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}); 
  response.modification.push({modifydate,type:'Edited'})
  const arr = response.modification
  req.body.modification = arr;
  const updatedResponse = await task.findOneAndUpdate({_id:tid},req.body,{ new: true, runValidators: true })
  res.status(200).json({res:'Success',data:updatedResponse})
}

const changeStatus = async(req,res)=>{
  console.log(req.params)
  const {tid,status} = req.params
  const response = await task.findOne({_id:tid})
  const modifydate = new Date(). toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}); 
  response.modification.push({modifydate,type:`Status Changed from ${response.status} to ${status}`})
  response.status = status
  const updateResponse = await task.findOneAndUpdate({_id:tid},response,{ new: true, runValidators: true })
  res.status(200).json({res:"Success",data:updateResponse})
}
const changeShow = async(req,res)=>{
  const {tid} = req.params
  const response = await task.findOne({_id:tid})
  response.isshow = !response.isshow;
  const updateResponse = await response.save();
  res.status(200).json({res:"Success",data:updateResponse})
}


module.exports = {test,addTask,deleteTask,getAllToDo,getAllInProgress,getAllDone,modifyTask,changeStatus,changeShow}