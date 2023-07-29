const { boolean } = require("joi");
const mongoose = require("mongoose");
require("dotenv").config();

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide name"],
  },
  description:{
    type:String,
    required:[true, "Please provide name"]
  },
  date:{
    type:Date,
    required:[true,"Please provide Date"]
  },
  due_date:{
    type:String,
    required:[true,"Please provide Due Date"]
  },
  priority:{
    type:String,
    enum:["LOW","MEDIUM","HIGH"]
  },
  status:{
    type:String,
    enum:["TO DO","IN PROGRESS","DONE"],
    default:"TO DO"
  },
  isshow:{
    type:Boolean,
    default:false
  },
  modification:{
    type:[Object]
  }
});


module.exports = mongoose.model("Task", TaskSchema);