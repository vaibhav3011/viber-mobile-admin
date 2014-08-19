/**
 * Created by harshpatel on 17/08/14.
 */
var mongoose = require('mongoose');
var studentSchema = require('../models/studentmodel.js');
var Students = studentSchema.student;
var redis =require("redis");
var client=redis.createClient(6379, '54.251.103.74');
client.select(2, function() { /* ... */ });


exports.list = function (req, res, next) {
    var city=req.param.city;
    var page=req.param.page;
    var q=  Students.find({"location.name":city}).select('facebookid name email location.name rolename role').sort({'updatedon':1}).skip(50*(page-1)).limit(50);
    q.exec(function(err,Students){
        console.log("city list");
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


exports.city = function (req, res, next) {

    client.get("citydata", function (err, reply) {
        console.log("city data");
        console.log(reply);
        res.send(reply);
    });



};