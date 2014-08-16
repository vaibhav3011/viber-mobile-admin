/**
 * Created by Ankit on 6/3/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var tasksSchema= new Schema({
    name: String,
    description : String,
    type : {id : Number, name : String},
    points : Number,
    parenttaskid : ObjectId,
    stage : ObjectId,
    completevalue :Number,
    startdate : Date,
    enddate : Date,
    createdby : String,
    createdon: {type: Date, 'default': Date.now},
    updatedon : {type : Date, 'default':Date.now},
    approvalrequired : Number,
    fields :{},
    condition :{}
},{ collection: 'tasks' });

exports.tasks = mongoose.model('Tasks', tasksSchema);

