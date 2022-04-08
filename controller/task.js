const db = require("../config/db");
const express = require('express');

const { successResponse, failResponse } = require("../helper/helperResponse");

var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));

var cors = require('cors');
router.use(cors());


/************** Task Detail *****************/

router.get('/allTasks', function (req, res) {
    let sql = "SELECT task_id, task_name, task_desc FROM `task` WHERE `task_status` = 1 order by task_id desc";
    db.query(sql, function (err, records) {
        if (err) {
            res.status(500).json(failResponse(err));
        } else if (typeof records != "undefined" && records != null && records.length != null && records.length > 0) {
            res.status(200).json(successResponse(records));
        } else {
            var msg = "Something went wrong!";
            res.status(503).json(failResponse(msg));
        }
    });
});

/************** Task Registration ************/

router.post('/addTask', function (req, res) {
    var name = req.body.taskName;
    var desc = req.body.taskDesc;
    var sql = "INSERT INTO `task` (`task_name`, `task_desc`) VALUES (?,?)";
    db.query(sql, [name,desc] , function(err, records){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Task added successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Task Delete ************/

router.get('/deleteTask/:id', function (req, res) {
    var id = req.params.id;
    var sql = "UPDATE `task` SET `task_status` = 0 WHERE `task_id` = ?";
    db.query(sql, [id] , function(err, records){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Task deleted successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Task Update ************/

router.post('/updateTask',function(req, res){
    var id = req.body.taskId;
    var name = req.body.taskName;
    var desc = req.body.taskDesc;
    var sql = "UPDATE `task` SET `task_name` = ?, task_desc = ? WHERE `task_id` = ? ";
    db.query(sql, [name,desc,id] , function(err, records, fields){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Task updated successfully";
            res.status(200).json(successResponse(msg));
        }
    })
});

module.exports = router; 