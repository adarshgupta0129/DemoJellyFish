const db = require("../config/db");
const express = require('express');

const { successResponse, failResponse } = require("../helper/helperResponse");

var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));

var cors = require('cors');
router.use(cors());


/************** Author Detail *****************/

router.get('/allAuthors', function (req, res) {
    let sql = "SELECT author_id, author_name, author_email FROM `author` WHERE `author_status` = 1 order by author_id desc";
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

/************** Author Registration ************/

router.post('/addAuthor', function (req, res) {
    var name = req.body.authName;
    var email = req.body.authEmail;
    var sql = "INSERT INTO `author` (`author_name`, `author_email`) VALUES (?,?)";
    db.query(sql, [name,email] , function(err, records){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Author added successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Author Delete ************/

router.get('/deleteAuthor/:id', function (req, res) {
    var id = req.params.id;
    var sql = "UPDATE `author` SET `author_status` = 0 WHERE `author_id` = ?";
    db.query(sql, [id] , function(err, records){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Author deleted successfully";
            res.status(200).json(successResponse(msg));
        }
    });
});

/************** Author Update ************/

router.post('/updateAuthor',function(req, res){
    var id = req.body.authId;
    var name = req.body.authName;
    var email = req.body.authEmail;
    var sql = "UPDATE `author` SET `author_name` = ?, author_email = ? WHERE `author_id` = ? ";
    db.query(sql, [name,email,id] , function(err, records, fields){
        if(err){ 
            res.status(500).json(failResponse(err));
        }else{
            var msg = "Author updated successfully";
            res.status(200).json(successResponse(msg));
        }
    })
});

module.exports = router; 