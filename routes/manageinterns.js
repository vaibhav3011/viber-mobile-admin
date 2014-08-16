/**
 * Created by akshat on 30/7/14.
 */

require('../config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var studentSchema = require('../models/studentmodel');
var student_functions = require('../routes/student-utils.js');
var stages_functions = require('../routes/stages.js');

Students = studentSchema.student;


function test_addrandomroles(role, email,cb){
    console.log('reached random roles');
    Students.find({'points': {$gte :500},'manager': {$exists : 0}}).limit(20)
        .exec(function(err,random_students){
            console.log('executed');
            if(!err){
                console.log(random_students);
                initial =0;
                final = random_students.length;
                random_students.forEach(function(instance){
                    instance.role = role;
                    instance.manager.email = email;
                    instance.manager.createdon = Date.now();
                    instance.manager.updatedon = Date.now();
                    instance.save(function(err,data){
                        if(!err){
                            console.log(data);
                        }else{
                            console.log(err);
                        }
                    })
                    initial++;
                    if(initial == final){
                        cb(1);
                    }
                });
            }else{
                console.log(err);
            }
        });
}

function add_grandchildren(role,email){
    email = 'akshat.goel@letsintern.com';
    role = 2;
    Students.find({'manager.email': email.toString()})
        .exec(function(err,children){
            if(!err){
                children.forEach(function(instance){
                    var grandchildrole = parseInt(instance.role - 1);
                    test_addrandomroles(grandchildrole,instance.email.toString(),function(data){
                        if(data ==1){
                            console.log('done');
                        }else{
                            console.log('something wrong here');
                        }
                    });

                });

            }else{
                console.log(err);
            }
        });
}

function getsubordinates(req,res){


    var email = req.params.email;
    console.log(email);
    var role =  parseInt(req.params.role);
    var returndata = {};
    console.log('role' + role);
    Students.find({'manager.email' :  email})
        .sort({points: -1})
        .select('name email stages college.name mobile points facebookid location.name updatedon')
        .exec(function (err, students) {
        
            switch(role) {
                case 1 : {     //cluster manager
                    res.send(JSON.stringify(students));
                    break;
                }
                case 2 : {          //project manager
                            var totalstudents = students.length;
                            var initial =0;
                    console.log('cluster managers below me' + students.length);
                        if(students.length >0) {
                            students.forEach(function (instance, index, students) {
                                getcmperformance(instance.email, function (err, reportees) {
                                    instance = instance.toObject();
                                    initial++;
                                    instance.reporteedata = reportees;
                                    students[index] = instance
                                    //console.log(instance);
                                    if (initial == totalstudents) {
                                       
                                        res.send(JSON.stringify(students));
                                    }
                                })
                            });
                        }else{
                            res.send('x');
                        }
                    ;break;
                }
                case 3 :{           // zonal manager
                    console.log('case 3');
                        var totalstudents = students.length;
                        var initial =0;
                    console.log(totalstudents);
                    if(students.length>0) {
                        students.forEach(function (instance, index, students) {
                            getpmperformace(instance.email, function (err, projectmanager_data) {
                                instance = instance.toObject();
                                initial++;
                                instance.reporteedata = projectmanager_data;
                                students[index] = instance;
                                //console.log(instance);
                                if (initial == totalstudents) {
                                    res.send(JSON.stringify(students));
                                }
                            });
                        })
                    }else{
                        res.send('x');
                    }
                    ;break;}
            }
        });
}

function getcmperformance(email,cb){  // cluster manager (1) performance for project manager view(2)
    var returndata ={
                     reportees :0,
                     stagedata: {}
                    };

    Students.find({'manager.email':email.toString()})
        .exec(function(err,reportees){
          if(!err){
              //console.log(reportees.length);
              returndata.reportees = (typeof reportees.length == 'undefined') ? 0 :reportees.length;
              //console.log('return data' + JSON.stringify(returndata));
             if(reportees.length > 0) {
                     var initial =0;
                 reportees.forEach(function(reportee_instance){

                     reportee_instance.stages.forEach(function(stage_instance){
                         var new_name = stage_instance.name.replace(' ','_');
                         if(parseInt(stage_instance.completion) == 100){
                             if(returndata.stagedata[new_name]){
                                 returndata.stagedata[new_name].count++
                             }else{
                                 returndata.stagedata[new_name] = {};
                                 returndata.stagedata[new_name].count = 1;
                             }
                         }
                     });
                     initial++;
                     if(initial == reportees.length){

                         //console.log('sending');
                         var sub_stages = Object.keys(returndata.stagedata);

                         sub_stages.forEach(function(substage){
                             returndata.stagedata[substage].percentage = parseInt((returndata.stagedata[substage].count/returndata.reportees)*100);
                         });

                         cb(null,returndata);

                     }
                 })
             }
             else{
                 console.log('zero')
                 cb(null,returndata);
             }
          }
        })
}

function getpmperformace(email,cb){  // project manager (2) performance for zonal manager(3) view
console.log('reached pm performance');
    var returndata ={
        clustermanagers :0,
        stagedata: {}
    };

    Students.find({'manager.email':email.toString()})
        .exec(function(err,clustermanagers){
            //console.log('cluster managers' + clustermanagers);
            returndata.clustermanagers = (typeof clustermanagers.length == 'undefined') ? 0 :clustermanagers.length;
            console.log('total people under this project manager' + returndata.clustermanagers);
            if(clustermanagers.length >0){
                var initial =0;
                var total_cm = clustermanagers.length;
                var reporteecount =0;
                clustermanagers.forEach(function(clustermanager_instance){

                            //console.log(clustermanager_instance.email)
                            getcmperformance(clustermanager_instance.email,function(err,reportees){
                                initial++;
                                //console.log(JSON.stringify(reportees));

                                //console.log('reportees '+reportees.reportees);
                                reporteecount += parseInt(reportees.reportees);
                               // console.log('total '+returndata.clustermanagers);
                                var my_levels = Object.keys(reportees.stagedata);
                               my_levels.forEach(function(stages_instance){
                                  if(returndata.stagedata[stages_instance]){
                                       returndata.stagedata[stages_instance].count += reportees.stagedata[stages_instance].count;
                                   }else{
                                       returndata.stagedata[stages_instance] ={}
                                       returndata.stagedata[stages_instance].count = reportees.stagedata[stages_instance].count;
                                   }
                               })
                                if(initial == total_cm){
                                    console.log('final return data' + JSON.stringify(returndata));
                                    var sub_stages = Object.keys(returndata.stagedata);
                                    sub_stages.forEach(function(substage){
                                        returndata.stagedata[substage].percentage = parseInt((returndata.stagedata[substage].count/reporteecount)*100);
                                    });

                                    cb(null,returndata);
                                }
                            })
                    });

            }else{
                console.log('zero');
                cb(null,returndata);
            }
        });
};


module.exports = {getsubordinates :getsubordinates,
    test_addrandomroles : test_addrandomroles,
    add_grandchild :add_grandchildren}

/**
 * Created by akshat on 12/8/14.
 */
