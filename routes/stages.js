/**
 * Created by akshat on 5/6/14.
 */


require('../config.js');
var stageSchema = require('../models/stagesmodel');

//----------------------------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//---- remove this later [for generating objectid]--------------

stages = stageSchema.stages;

var dummystage= {
    name: 'Test stage',
    description :'Test stage description',
    campaignid :new ObjectId,
    tasks: [],
    startdate : Date.now(),
    enddate : Date.now(),
    createdby :'Admin',
    createdon : Date.now(),
    updatedon : Date.now()
};




function list(cb) {
    stages.find({}, function (err, stages) {
        if(!err){
            cb(stages);
        }else{
            cb(0);
        }
    });
};

function addstage(req, res) {

    validateSignUp(req, function (error, data) {
        console.log('returnValidate');
        if (error)
        {
            res.send(400, error.message)
        }
        else {
            res.send(JSON.stringify(data));
            console.log('Sending data back to the client');
        }
    });

};


function info(req,res){
    stageid = req.params.oid;
    getStageInfo(stageid,function(err,stage){
        if(!err){
        console.log('no e');
           res.send(stage);
       }else{
           console.log(err);
       }
    });
}

function validateSignUp(req, callback) {

    stages.count({'name': req.body.name}, function (err, count) {
        var data = req.body;
        console.log(count);
        if (err) {
            callback(err.message, null);
        }
        else {
            if (0 == count) {

                objstage = new stages(data);
                console.log(objstage);
                objstage.save();

                return callback(objstage, 'stage Added');
            }
            else {
                return callback(null, 'stage exists');
            }
        }

    });


}

function getStageInfo  (stageid, callback){
    stages.findOne({ '_id': stageid }, function (err, stage) {
        if (!err) {

            if(stage === null){
                return callback(null,0);
            }
            else
            {
                console.log('this is the stage');
                console.log(JSON.stringify(stage));
                return callback(null,stage);
            }
        } else {
            callback(null,err.message);
        }
    });
}

module.exports = {
        getStageInfo : getStageInfo,
        list :list,
        addstage :addstage,
        info :info
}



