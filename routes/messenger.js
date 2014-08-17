/**
 * Created by harshpatel on 16/08/14.
 */

var mongoose = require('mongoose');
var studentSchema = require('../models/studentmodel.js');
var Students = studentSchema.student;
exports.people = function (req, res, next) {
    var q=  Students.find({"isMessenger":true}).select('facebookid name email location.name rolename role refercount');
    q.exec(function(err,Students){

        if(!err)
        {

            res.send(JSON.stringify(Students));

        }
        else
        {
            res.send(err);
            console.log(err);
        }

    });
};