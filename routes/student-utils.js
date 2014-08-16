/**
 * Created by Ankit on 5/16/2014.
 */

var config = require('../config.js');

var studentSchema = require('../models/studentmodel');
var taskSchema = require('../models/tasksmodel');
var task_functions = require('../routes/tasks.js');
var stages_function = require('../routes/stages.js');


Students = studentSchema.student;
student_task = studentSchema.student_task;
vibes_transaction = studentSchema.vibes_transaction;
tasks = taskSchema.tasks;

/*
 dummyuser = new Students;
 dummyuser.name ='Test User';
 dummyuser.email = 'testing@viberapp.com';
 dummyuser.mobile = 98292929292;
 dummyuser.facebookid = 0000230232738;
 dummyuser.createdon = Date.now();
 dummyuser.updatedon = Date.now();
 dummyuser.gender = 'male';
 dummyuser.dob = '21/4/1990'; // has to be an ISO date after casting
 dummyuser.college.id = 989;
 dummyuser.college.name = 'Testing College';
 dummyuser.location.id = 1401;
 dummyuser.location.name = 'Random city';
 dummyuser.facebook.authorized = 1;
 dummyuser.facebook.authcode = 'ashdwhh23232hshdghsgbdjabd334343434hjbdhsbjdbjwbd';
 dummyuser.points = 0;
 dummyuser.type.id = 1;
 dummyuser.type.name = 'Student';
 //console.log(JSON.stringify(dummyuser));
 */

function list(req, res) {
    console.log('list reached');
    Students.find({}, function (err, Students) {
        res.send(JSON.stringify(Students));
    });
};

function stage_add_to_all(facebookid) {


    Students.find().exists('user_tasks', false).limit(5000).exec(function (err, students) {

        students.forEach(function (instance) {
            console.log(instance.facebookid + ' -- ' + instance.name);
            var stageid = '5390521624349ecc0c108c10';
            var stage_name = 'Level 1';
            var stage = {
                "name" : stage_name.toString(),
                "stageid" : stageid.toString(),
                "completion" : 0
            };
            console.log(stage);
            console.log('adding student stages now');
            Students.update({'facebookid': instance.facebookid},
                {$addToSet: {stages:stage}},{upsert:true},function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully added")
                        stages_function.getStageInfo(stageid, function (err, stage) {
                            if (!err) {
                                console.log('stages :'  + stage.tasks);
                                if (stage && stage.tasks) {
                                    var user_tasks = stage.tasks;
                                    //console.log(user_tasks);
                                    user_tasks.forEach(function (user_tasks) {
                                        addTaskToUser(instance.facebookid, user_tasks.stageid.toString());
                                    });
                                }
                            }
                        });
                    }
                });

        });

        res.send('done');
    });


}


function add_stage1(facebookid,cb) {
console.log('adding stage to new user')
    Students.find({'facebookid' :facebookid}).exec(function (err, students) {
        console.log('studnet :' + JSON.stringify(students));
        students.forEach(function (instance) {
            //console.log(instance.facebookid + ' -- ' + instance.name);
            var stageid = '5390521624349ecc0c108c10';
            var stage_name = 'Level 1';
            var stage = {
                "name" : stage_name.toString(),
                "stageid" : stageid.toString(),
                "completion" : 0
            };
            //console.log(stage);
            console.log('adding student stages now');
            Students.update({'facebookid': instance.facebookid},
                {$addToSet: {stages:stage}},{upsert:true},function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully added")
                        stages_function.getStageInfo(stageid, function (err, stage) {
                            if (!err) {
                                //console.log('stages :'  + stage.tasks);
                                if (stage && stage.tasks) {
                                    var user_tasks = stage.tasks;
                                    console.log(user_tasks);
                                    var total_tasks = user_tasks.length;
                                    var added =0;

                                    user_tasks.forEach(function (user_tasks) {
                                        addTaskToUser(instance.facebookid, user_tasks.stageid.toString(),function(err,data){
                                            if(data){
                                                added++;
                                            }
                                            if(added == total_tasks){
                                                cb(null,1);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                });

        });


    });

}

function add_stage2(facebookid,cb) {
    console.log('adding stage to new user')
    Students.find({'facebookid' :facebookid}).exec(function (err, students) {
        console.log('studnet :' + JSON.stringify(students));
        students.forEach(function (instance) {
            //console.log(instance.facebookid + ' -- ' + instance.name);
            var stageid = '53d1e5fbbb5c82917b3a3a40';
            var stage_name = 'Level 2';
            var stage = {
                "name" : stage_name.toString(),
                "stageid" : stageid.toString(),
                "completion" : 0
            };
            //console.log(stage);
            console.log('adding student stages now');
            Students.update({'facebookid': instance.facebookid},
                {$addToSet: {stages:stage}},{upsert:true},function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully added")
                        stages_function.getStageInfo(stageid, function (err, stage) {
                            if (!err) {
                                //console.log('stages :'  + stage.tasks);
                                if (stage && stage.tasks) {
                                    var user_tasks = stage.tasks;
                                    console.log(user_tasks);
                                    var total_tasks = user_tasks.length;
                                    var added =0;

                                    user_tasks.forEach(function (user_tasks) {
                                        addTaskToUser(instance.facebookid, user_tasks.stageid.toString(),function(err,data){
                                            if(data){
                                                added++;
                                            }
                                            if(added == total_tasks){
                                                cb(null,1);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                });

        });


    });

}


function add_stage(facebookid,stageid,stagename,cb) {
    console.log('adding'+stagename+ ' now...');
    Students.find({'facebookid' :facebookid}).exec(function (err, students) {
        //console.log('studnet :' + JSON.stringify(students));
        students.forEach(function (instance){
            //console.log(instance.facebookid + ' -- ' + instance.name);
            var stage =  {
                "name" : stagename.toString(),
                "stageid" : stageid.toString(),
                "completion" : 0
            };
            //console.log(stage);
            console.log('adding student stages now');
            Students.update({'facebookid': instance.facebookid},
                {$addToSet: {stages:stage}},{upsert:true},function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully added")
                        stages_function.getStageInfo(stageid, function (err, stage) {
                            if (!err) {
                                //console.log('stages :'  + stage.tasks);
                                if (stage && stage.tasks) {
                                    var user_tasks = stage.tasks;

                                    var total_tasks = user_tasks.length;
                                    var added =0;

                                    user_tasks.forEach(function (user_tasks) {
                                        addTaskToUser(instance.facebookid, user_tasks.stageid.toString(),function(err,data){
                                            if(data){
                                                added++;
                                            }
                                            if(added == total_tasks){
                                                cb(null,1);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                });

        });


    });
}



function getstudentdata(req, res) {
    console.log('reached get student data');
    if (req.session.student !== null) // check if the user is logged in
    {
        console.log('studnet session found in session');
        return Students.findOne({ 'facebookid': req.session.student.facebookid}, function (err, student) {
            if (!err) {

                if (student === null) {
                    console.log('not found');
                    res.send('no record found');
                }
                else {

                    config.complement(student.facebookid, function(err,data){
                        req.session.student = student;
                        req.session.student.c = data.toString();
                        res.send(req.session.student);
                    });

                }
            } else {
                res.send(err);
            }
        })

    }
    else {
        console.log('unauthorized');
        res.send('Unauthorized');
    }

}

function signup(req, res) {


    validateSignUp(req, function (error, data) {
        console.log('returnValidate');
        if (error) {
            res.send(400, error.message)
        }
        else {
            var stageid = '[stageid]';
            stages_function.getStageInfo(stageid, function (err, stage) {
                if (!err) {

                    if (stage && stage.tasks) {
                        var user_tasks = stage.tasks;
                        user_tasks.forEach(function (user_tasks) {
                            console.log(user_tasks);
                            addTaskToUser('10152198497022499', user_tasks.stageid.toString());
                        });
                    }


                }
            });
            res.send(JSON.stringify(data));
            console.log('Sending data back to the client');
        }
    });

};

function info(req, res) {

    return Students.findOne({ 'facebookid': req.params.fbid}, function (err, student) {
        if (!err) {

            if (student === null) {
                console.log('not found');
                return res.send('no record found');
            }
            else {
                return res.send(student);
            }
        } else {
            return res.send(err);
        }
    });

}

function allusersoftype(req, res) {
    return Students.find({ 'type.id': req.params.usertypeid}, function (err, users) {
        if (!err) {

            if (users === null) {
                return res.send('0 users of this type');
            }
            else {
                return res.send(users);
            }
        } else {
            return res.send(err);
        }
    });


}

function getfacebookfriends(req, res) {
    return Students.find({ 'facebookid': req.params.fbid}, 'facebook.friends', function (err, friends) {
        if (!err) {

            if (friends === null) {
                return res.send('0 friends ');
            }
            else {
                return res.send(friends);
            }
        } else {
            return res.send(err);
        }
    });
}

function putfacebookfriends(req, res) {

    Students.update({facebookid: req.params.facebookid},
        {$addToSet: {'facebook.friends': {$each: req.body.friends}
        }

        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully added");
            }
        });
}


function addpoints(facebookid,points,cb) {
    //console.log('reached add points');
    console.log('points to add :' + points);
    Students.update({facebookid: facebookid},
        {$inc: {
            points: points
        }
        }, function (err) {
            if (err) {
                cb(0);
            } else {
                cb(points);
            }
        });
}

function leaderboard(req, res) {
    type = req.params.type;
    filter_id = req.params.id;
    var query ={};
    if(type === 'city'){
        query['location.name'] = filter_id;
    }else if(type ==='college'){
        query['college.name'] = filter_id;
    }

    //console.log('the query id :' + query);
    Students.find(query)
        .sort({points: -1})
        .limit(10)
        .select('name points facebookid location.name')
        .exec(function (err, posts) {
            res.send(posts);
        });
}


function availabletasks(req, res) {
    return Students.find({ 'facebookid': req.params.fbid}, 'stages tasks', function (err, opentasks) {
        if (!err) {

            if (friends === null) {
                return res.send(-1);
            }
            else {
                return res.send(opentasks);
            }
        } else {
            return res.send(err);
        }
    });
}  // not implemented yet

function submittask(req, res) {
    var facebookid = req.params.fbid;
    var taskid = req.params.taskid;
    addTaskToUser(facebookid, taskid);

}

function updatetask(req, res) {

    var facebookid = req.params.fbid;
    var taskid = req.params.taskid;
    var verb = req.body.verb;

    switch (verb) {
        case 'updateAnswers' :
            updateAnswers(facebookid, taskid, req.body.answers);
            break;
        case 'completeTask' :
            completeTask(facebookid, taskid);
            break;
    }

}

function validateSignUp(req, callback) {


    Students.count({'facebookid': req.body.facebookid}, function (err, count) {
        var data = req.body;
        console.log(count);
        if (err) {
            callback(err.message, null);
        }
        else {
            if (0 == count) {

                objstudent = new Students(data);

                config.utils.objectvalidator('student', objstudent, function (validated_object) {

                    var new_student = validated_object;
                    console.log('got something');

                    if (validated_object !== 0) {
                        console.log(validated_object);
                        objstudent.save();
                        return callback(validated_object, 'User Registered');
                    } else {
                        console.log('there was an error');
                        return callback(null, 'there was an error');
                    }
                });


            }
            else {
                return callback(null, 'facebookid exists');
            }
        }

    });


}


function updateSettings(req,res) {

    facebookid = req.params.facebookid;
    updated_settings= req.body;
    objstudent = new Students(updated_settings);



    config.utils.objectvalidator('student_update', objstudent, function (validated_object) {

        var new_student = validated_object;


        if (validated_object !== 0) {
            //console.log(validated_object);
            return Students.findOne({ facebookid: facebookid }, function (err, doc) {
                if (!err) {
                    doc.name = validated_object.name;
                    doc.mobile = validated_object.mobile;
                    doc.email = validated_object.email;
                    doc.gender = validated_object.gender;
                    doc.location.id = validated_object.location.id;
                    doc.location.name= validated_object.location.name;
                    doc.college.id  = validated_object.college.id;
                    doc.college.name  = validated_object.college.name;
                    doc.save();
                    res.send('success');
                }
                else {
                    console.log(err)
                }
                ;
            });
            //return callback(validated_object, 'User Registered');
        } else {
            res.send('error');
        }
    });



}

function updateAnswers(facebookid, taskid, answers,cb) {

    //console.log('logging new answers in updateAnswers :'  + JSON.stringify(answers));
    Students.findOne({ 'facebookid': facebookid })
        .select({ 'user_tasks': { $elemMatch: {task_id: taskid}}})
        .exec(function (err, doc) {
            if (err) {
                cb(0);
            } else {


                old_answers = new Array();

                if(doc.user_tasks[0] && doc.user_tasks[0].answers.length >0 ) {
                    old_answers = doc.user_tasks[0].answers;
                }
                old_answers.push(answers);

                //console.log('final answers \n' + JSON.stringify(old_answers));
                //console.log('final answers without stringify' + old_answers);



                Students.update({'facebookid': facebookid, 'user_tasks.task_id': taskid},
                    {$set: { 'user_tasks.$.answers': old_answers } }
                    , function (err) {
                        if (err) {
                            console.log(err);
                            cb(0);
                        } else {
                            console.log('answers updated');
                            cb(old_answers);
                        }
                    });
            }
        });

    /*Students.findOne({ 'facebookid': facebookid })
     .select({ 'user_tasks': { $elemMatch: {task_id: taskid}}})
     .exec(function (err, doc) {
     if (err) {
     cb(0);
     } else {


     if(doc.user_tasks[0].answers) {
     var old_answers = doc.user_tasks[0].answers;
     var check_criteria = (Object.keys(answers));
     for (var index = 0; index < check_criteria.length; index++) {
     prop = [check_criteria[index]].toString();
     if (answers[prop] !== ''
     || (typeof answers[prop] !== 'undefined')
     || answers[prop] !== null) {
     old_answers[prop] = answers[prop];
     } else {
     console.log('no');
     }
     }


     Students.update({'facebookid': facebookid, 'user_tasks.task_id': taskid},
     {$set: { 'user_tasks.$.answers': old_answers } }
     , function (err) {
     if (err) {
     cb(0);
     } else {
     cb(old_answers);
     }
     });

     console.log(old_answers);
     }else{
     Students.update({'facebookid': facebookid, 'user_tasks.task_id': taskid},
     {$set: { 'user_tasks.$.answers': answers } }
     , function (err) {
     if (err) {
     cb(0);
     } else {
     cb(answers);
     }
     });
     }
     }
     }); */

};

function completeTask(facebookid, taskid,orig_points,cb) {

    Students.findOne({ 'facebookid': facebookid })
        .select({ 'user_tasks': { $elemMatch: {task_id: taskid}}})
        .exec(function (err, doc) {
            var condition = doc.user_tasks[0].condition;
            var answers = doc.user_tasks[0].answers;
            var points =0;
            if(orig_points !== 0){
                console.log('points found');
                points = orig_points;
            }else{
                points = doc.user_tasks[0].points;
            }

            var stageid = doc.user_tasks[0].stage;
            var c_pc = doc.user_tasks[0].completevalue;
             already_complete = doc.user_tasks[0].completed;
            var taskname = doc.user_tasks[0].name;

            var check_criteria = (Object.keys(condition));


            var check_object = {};
            for (var index = 0; index < check_criteria.length; index++) {
                prop = [check_criteria[index]].toString();
                check_object[prop] =0;
            }

            //console.log('this is the check object :' + JSON.stringify(check_object));
            answers.forEach(function (instance)
            {

                for (var index = 0; index < check_criteria.length; index++) {
                    prop = [check_criteria[index]].toString();

                    if (instance.hasOwnProperty(prop)
                        && instance[prop] !== ''
                        && (typeof instance[prop] !== 'undefined')
                        && instance[prop] !== null) {
                        check_object[prop]= 1;
                        //console.log(prop + ' value is present');
                    }else{
                        //console.log(prop + 'value is not present');
                    }
                }
            });

            var completion = 1;
            for(var index in check_object)
            {

                if(check_object[index] == 1){

                }else{
                    completion = 0;
                }
            }

            console.log('completion :' + completion);
            if (completion == 1)  {
                var completion_value = {};
                completion_value.user_task = doc.user_tasks[0];
                Students.update({'facebookid': facebookid, 'user_tasks.task_id': taskid},    //completion :1, add points, add transaction
                    {$set: { 'user_tasks.$.completed': 1 } }
                    , function (err) {
                        if (err) {
                            console.log('cb error');
                            cb(0);
                        } else {
                            //var singular = false;
                            console.log('this is the task id in complete answers :' + taskid);

                            if (already_complete != 1 || taskid =='53db763c68425b29ecc82f4e') {
                            addpoints(facebookid, points, function (points_to_add) {
                                //console.log('points to add :'+ points_to_add);
                                if (points_to_add == 0) {
                                    console.log('cb error');
                                    cb(0)
                                } else {
                                    completion_value.points = points_to_add;
                                    var transaction = new studentSchema.vibes_transaction;
                                    transaction.vibes = points;
                                    transaction.type = 'task';
                                    transaction.sign = 1;
                                    transaction.message = 'Task completion - ' + taskname;
                                    console.log('added points');
                                    VibesTransaction(facebookid, transaction, function (v_transaction) {
                                        //console.log(v_transaction);
                                        if (v_transaction !== 0) {
                                            completion_value.transaction = v_transaction;
                                                console.log('calling stage completion');
                                                if(already_complete != 1) {
                                                    complete_user_stage(facebookid, stageid, c_pc, function (completed_percentage) {
                                                        if (completed_percentage == 0) {
                                                            cb(completion_value);
                                                        } else {
                                                            completion_value.level = completed_percentage;
                                                            cb(completion_value);
                                                        }
                                                    })
                                                }else{
                                                    cb(completion_value);
                                                }
                                            console.log('added transactiontion');
                                        } else {
                                            console.log('cb error');
                                            cb(0)
                                        }

                                    });
                                }
                            });
                        }else{
                            cb(0)
                            }

                            /*task_functions.getchildren(taskid, function (new_tasks) {
                             var unlockedtasks = new_tasks;
                             console.log('student');
                             unlockedtasks.forEach(function (entry) {
                             addTaskToUser(facebookid, entry._id);
                             });

                             }); */


                        }
                    });

            }else {
                cb(0)
            }


        });

}

function addTaskToUser(facebookid, taskid,cb) {

    taskid = config.ObjectId(taskid);

    tasks.findOne({ '_id': taskid}, function (err, task) {
        if (!err) {

            if (task === null) {
                console.log(taskid + ' not there ?')
                cb(0)
            }
            else {
                student_task = new studentSchema.student_task;
                student_task.task_id = taskid;
                student_task.points = task.points;
                student_task.completed = 0;
                student_task.approvalrequired = task.approvalrequired;
                student_task.managerapproved = 0;
                student_task.fields = task.fields;
                student_task.condition = task.condition;
                student_task.type = task.type;
                student_task.stage = task.stage;
                student_task.completevalue = task.completevalue;
                student_task.name = task.name;

                if (!student_task) {
                    cb(0)
                } else {

                    switch (student_task.type.id) {
                        case (1) :
                        {
                            student_task.completed = 0;
                            break;
                        }  //social
                        case (2) :
                        {
                            student_task.completed = 1;
                            break;
                        }  //photos
                        case (3) :
                        {
                            student_task.completed = 2;
                            break;
                        }  //survey
                        case (4) :
                        {
                            student_task.completed = 1;
                            break;
                        }  //phone_no
                    }
                    Students.update({'facebookid': facebookid}, {$addToSet: {user_tasks: student_task}},
                        function (err, added_task) {

                            if (err) {
                                cb(0)
                            }
                            //console.log(student_task);
                            cb(null,student_task);
                        })
                }


            }
        } else {
            return console.log(err);
        }
    });
}


function addTwitter(req, res) {
    console.log('student facebookid ' + req.session.student.facebookid)
    console.log('student twit data ' + JSON.stringify(req.session.twit));

    /*return  Students.update({'facebookid':'10152198497022499','twitter.authorized':0},
     {$set : {"twitter.$.authorized" : 1, "twitter.$.authcode": "abcd"} }
     ,function(err){
     if(err){
     console.log(err);
     }else{

     }
     }); */
    return Students.findOne({ facebookid: req.session.student.facebookid }, function (err, doc) {

        if (!err) {
            var facebookid =req.session.student.facebookid;
            if(typeof doc.twitterid === 'undefined'){
                doc.twitter.authorized = 1;
                doc.twitterid = req.session.twit['id'];
                doc.twitter.name = req.session.twit['name'];
                doc.twitter.username = req.session.twit['username'];
                doc.twitter.authcode = req.session.twit['authcode'];
                doc.twitter.secret = req.session.twit['secret'];
                req.session.student.twitterid = req.session.twit['id'];
                req.session.twitter = doc.twitter;
                doc.save();


                var transaction = new studentSchema.vibes_transaction;
                transaction.vibes = 400;
                transaction.type = 'Twitter';
                transaction.sign = 1;
                transaction.message = 'Twitter Authentication test';
                addpoints(facebookid,400,function(points_to_add){
                    if(points_to_add !== 0){
                        VibesTransaction(facebookid, transaction, function (v_transaction) {
                            console.log(v_transaction);
                            if (v_transaction !== 0) {

                                //console.log('session points are earlier: ' + req.session.student.points);
                                req.session.student.vibes_transaction.push(v_transaction);
                                req.session.student.points = req.session.student.points +  400;
                                //console.log('session transactions are : ' + JSON.stringify(req.session.student.vibes_transaction));
                                //console.log('session points are later: ' + req.session.student.points);
                                //console.log('done');
                                //console.log('this is the session' + JSON.stringify(req.session.student));
                                res.send('<script>window.close()</script>');
                            } else {
                                console.log('bhencho err');
                                res.send('err');
                            }

                        });
                    } else{
                        res.send('err');
                    }
                });

            }
            else{res.send('already exists');}
        }

        else {
            console.log(err)
        }
        ;
    });
}

function VibesTransaction(fbid, transaction,cb) {

    console.log('reached transaction');
    transaction_skeleton = new studentSchema.vibes_transaction;
    transaction_skeleton = transaction;


    Students.update({'facebookid': fbid}, {$push: {vibes_transaction: transaction_skeleton}},
        function (err, added_task) {

            if (err) {
                cb(0);
            } else {
                cb(transaction);
            }
        })


}

function logout(req, res) {
    req.session.destroy;
    res.redirect('/');
}

function complete_user_stage(facebookid,stageid,completion_value,cb) {
    console.log('stage completion data...' + facebookid + ' -- \n' + stageid + '----\n ' + completion_value);

    Students.findOne({ 'facebookid': facebookid })
        .select({ 'stages': { $elemMatch: {stageid: stageid.toString()}}})
        .exec(function (err, doc) {
            console.log('comp data' + doc.stages[0].completion);
            doc.stages[0].completion = parseInt(doc.stages[0].completion)  + completion_value;
            console.log('final value' + doc.stages[0].completion);

            Students.update({'facebookid': facebookid, 'stages.stageid': stageid},
                {$set: { 'stages.$.completion': doc.stages[0].completion } }
                , function (err){
                    cb(20);
                })
        });

}

function delete_my_data(req,res){
    var fb_id = req.params.facebookid;
    console.log(fb_id);
    return Students.findOne({facebookid: req.params.facebookid }, function (err, doc) {
        if (!err & doc !== null) {
            console.log(JSON.stringify(doc));
            doc.stages = undefined;
            doc.user_tasks=undefined;
            doc.vibes_transaction = undefined;
            doc.facebook = undefined;
            doc.facebookid = undefined;
            doc.gender = undefined;
            doc.name = undefined;
            doc.points = 0;
            doc.save();
            res.send(' data deleted');
        }else{
            res.send('done');
        };






    });

}

function validateemail(req,res) {

    console.log('reached validate');
    console.log('req.session.newmail' + req.session.new_email);
    var email = req.body.mail;

    if (email) {
        req.session.register_mail = email;
        res.redirect('/auth/facebook');
        }
}

function verify_vibes(req,res){
    console.log('readched cron');
    Students.find({}, 'facebookid',  function (err, v_students) {
        var facebookids = new Array();
        console.log('got students');
        console.log(JSON.stringify(v_students));
        v_students.forEach(function(instance){
                if(instance.facebookid){
                    //console.log ('calculation for : ' +  instance.facebookid);
                    var final_points =0;
                    var vibes_points = 0;
                return Students.findOne({ facebookid: instance.facebookid }, function (err, doc) {
                    doc.vibes_transaction.forEach(function(transaction){
                        //console.log(transaction.vibes);
                        vibes_points+= parseInt(transaction.vibes);
                    });

                    if(!doc.vcron) {
                        var original_vibes = (parseInt(doc.points) - vibes_points > 0) ? (parseInt(doc.points) - vibes_points) : 0;
                    }else{
                        var original_vibes = parseInt(doc.vcron);
                    }
                    //console.log('after  substraction :' + (parseInt(doc.points) - vibes_points));
                    //console.log('original vibes :' + original_vibes);
                    final_points += original_vibes;

                    var counted_tasks = [];
                    var invited_friends = [];
                    var stage_completion = 0;
                    doc.user_tasks.forEach(function(task){
                        if(task.completed ==1 ){
                            if(!counted_tasks[task.taskid]) {
                                    //console.log('counted');
                                switch(task.task_id){
                                    case '53a9526be4b041d6a3190439':{         //like and follow
                                        final_points += 500;
                                        break;
                                    }
                                    case '53a951f9e4b041d6a3190438':{         //get to know viber
                                        final_points += 1000;
                                        break;
                                    }
                                    case '53a9526be4b041d6a3190442':{         //wowed by stickers
                                        final_points += 1000;
                                        break;
                                    }
                                    case '53a9526be4b041d6a3190440':{         //invite facebook friends
                                        final_points += 500;
                                        break;
                                    }
                                    case '53a9526be4b041d6a3190441':{         //upload photos selfie
                                        final_points += 2500;
                                        break;
                                    }

                                }
                                stage_completion += task.completevalue;
                                counted_tasks[task.taskid] == 1
                            }
                        }

                            console.log('final points after tasks :' + final_points);

                        if(task.task_id =='53a9526be4b041d6a3190440') {
                            //console.log('facebook friends');
                            if(task.answers){
                            task.answers.forEach(function (answers) {
                                if(typeof answers.fb_ids == 'object' &&  answers.fb_ids.length >0) {
                                    answers.fb_ids.forEach(function (friend) {
                                        if (invited_friends.indexOf(friend) == -1) {
                                            invited_friends.push(friend);
                                        }
                                    })
                                }
                            });
                        }
                        }


                    });
                    final_points += (invited_friends.length)*50;
                    console.log('total friends :' + invited_friends.length);

                    doc.points  = final_points;
                    doc.vcron = original_vibes;
                    if(typeof doc.stages =='object' && doc.stages[0]) {
                        console.log(doc.facebookid);
                        doc.stages[0].completion = stage_completion;
                    }else{
                        console.log('no stage');
                    }
                    doc.save(function(err){
                        if(!err){
                            console.log('actual vibes  for ' + doc.email +' are ' +  final_points);
                        }else{
                            console.log(err);
                        }
                    })
                });

            }
        });



    });
    //res.send('done');
}

function one_task(req,res){
    console.log('reached one_task cron');
        Students.find()
            .where('stages.0.completion')
            .gte(20)
            .exec(function (err, v_students) {
                if(v_students){
                    console.log(v_students);
                    res.send('done');
                }else{
                    console.log('nothing found');
                    res.send('done');
                }
            });

    };

function getstudentauth(req,res) {
    Students.findOne({ facebookid: req.params.fbid}, 'auth', function (err, authstudent) {
        if (authstudent) {
            res.send(authstudent.auth.toString());
        } else {
            res.send('auth not found');
        }

    });
}

function addsubordinates(req,res){
    console.log('reached put subordinates');
    console.log(req.body);

    var myinterns = req.body.interns
    var role = parseInt(req.body.role) - 1;
    var manager =  {name: req.body.name,
                    email : req.body.email,
                    updatedby : Date.now(),
                    updatedon : Date.now()}
    var rolename =''
    switch (role) {
        case (0) : {rolename ='Intern';break;}
        case (1) : {rolename ='Cluster Manager';break;}
        case (1) : {rolename ='Project Manager';break;}
        case (1) : {rolename ='Zonal Manager';break;}
    }

    var conditions ={ email: { $in: myinterns } }
        , update = { $set: { role : role , rolename : rolename,manager : manager} }
        , options = { multi: true };

    Students.update(conditions, update, options, function(err,data){
            if(err){
                console.log('0');
            }else{
                res.send(data.toString());
            }
    });


}

// function getsubordinates(req,res){

//     var email = req.email;

//     Students.find({'manager.email' :  email})
//         .sort({points: -1})
//         .select('name email stages college.name mobile points facebookid location.name updatedon')
//         .exec(function (err, students) {
//             res.send(students);
//         });
// }

function removesubordinate(req,res){

    var email = req.session.student.email;
    var am_email = req.body.email;

    var manager = {email : '',
        updatedby : req.session.student.email,
        updatedon : Date.now()}


    var conditions ={ email:  am_email ,'manager.email' : email }
        , update = { $set: {manager : manager}}
        , options = { multi: true };

    Students.update(conditions, update, options, function(err,data){
        if(err){
            console.log(err);
            res.send('0');
        }else{
            res.send(data.toString())
        }
    });
}



module.exports = {list: list,
    stage_add_to_all: stage_add_to_all,
    add_stage1 :add_stage1,
    add_stage2 : add_stage2,
    add_stage : add_stage,
    getstudentdata: getstudentdata,
    signup: signup,
    info: info,
    allusersoftype: allusersoftype,
    getfacebookfriends: getfacebookfriends,
    putfacebookfriends: putfacebookfriends,
    addpoints: addpoints,
    leaderboard: leaderboard,
    availabletasks: availabletasks,
    submittask: submittask,
    updatetask: updatetask,
    validateSignUp: validateSignUp,
    updateAnswers: updateAnswers,
    completeTask: completeTask,
    addTaskToUser: addTaskToUser,
    addTwitter: addTwitter,
    VibesTransaction: VibesTransaction,
    logout: logout,
    updateSettings : updateSettings,
    delete_my_data : delete_my_data,
    validateemail :validateemail,
    verify_vibes :verify_vibes,
    one_task :one_task,
    getstudentauth :getstudentauth,
   // getsubordinates : getsubordinates,
    addsubordinates : addsubordinates,
    removesubordinate : removesubordinate
}






