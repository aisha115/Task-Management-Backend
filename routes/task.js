const express = require('express')
const router = express.Router()

const {test,addTask,deleteTask,getAllToDo,getAllDone,getAllInProgress,modifyTask,changeStatus, changeShow} = require('../controllers/task')

router.route('/').get(test)
router.route('/addTask').post(addTask)
router.route('/deleteTask/:tid').delete(deleteTask)
router.route('/getAllToDo').get(getAllToDo)
router.route('/getAllInProgress').get(getAllInProgress)
router.route('/getAllDone').get(getAllDone)
router.route('/modifyTask/:tid').post(modifyTask)
router.route('/changeStatus/:tid/:status').get(changeStatus)
router.route('/changeShow/:tid').get(changeShow)

module.exports = router