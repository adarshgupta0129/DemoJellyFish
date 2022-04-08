const db = require("../config/db");
const express = require('express');

const { successResponse, failResponse } = require("../helper/helperResponse");

var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
router.use(cors());


/************** Timer Detail *****************/

router.get('/allTimers', function (req, res) {
    let sql = "SELECT * FROM `view_timer` WHERE `timer_status` = 1 order by timer_id desc";
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

/************** Timer Adding ************/

router.post('/addTimer', function (req, res) {
    var timerName = req.body.timerName;
    var authId = req.body.authId;
    var taskId = req.body.taskId;
    var sql = "INSERT INTO `timer` (`timer_name`,`timer_auth_id`, `timer_task_id`) VALUES (?,?,?)";
    db.query(sql, [timerName, authId, taskId], function (err, records) {
        if (err) {
            res.status(500).json(failResponse(err));
        } else {
            var msg = "Timer added successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Timer Delete ************/

router.get('/deleteTimer/:id', function (req, res) {
    var id = req.params.id;
    var sql = "UPDATE `timer` SET `timer_status` = 0 WHERE `timer_id` = ?";
    db.query(sql, [id], function (err, records) {
        if (err) {
            res.status(500).json(failResponse(err));
        } else {
            var msg = "Timer deleted successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Timer Update ************/

router.post('/updateTimer', function (req, res) {
    var id = req.body.timerId;
    var timerName = req.body.timerName;
    var sql = "UPDATE `timer` SET `timer_name` = ? WHERE `timer_id` = ? ";
    db.query(sql, [timerName, id], function (err, records, fields) {
        if (err) {
            res.status(500).json(failResponse(err));
        } else {
            var msg = "Timer updated successfully";
            res.status(200).json(successResponse(msg));
        }
    })
});

/************** Timer Time Update ************/
router.post('/updateTimerTime', function (req, res) {
    var id = req.body.timerId;
    var ts = req.body.ts;
    var sql = "UPDATE `timer` SET `timer_tot_time` = ? WHERE `timer_id` = ? ";
    db.query(sql, [ts, id], function (err, records, fields) {
        if (err) {
            res.status(500).json(failResponse(err));
        } else {
            var msg = "Time recorded";
            res.status(200).json(successResponse(msg));
        }
    })
});

module.exports = router; 