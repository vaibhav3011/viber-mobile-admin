/**
 * Created by Ankit on 5/19/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var user_task_schema = new Schema({
    name : String,
    task_id : String,
    stage :String,
    completevalue : Number,
    type : {id : Number, name : String},
    points : Number,
    completed : Number,
    approvalrequired : Number,
    managerapproved : Number,
    fields : {},
    answers : [Schema.Types.Mixed],
    condition :{}
});

//var manager_schema = new Schema()

var vibes_transaction_schema = new Schema({
    "vibes" : Number,
    "type": String,
    "sign" : Number,
    "message" : String
});

var studentSchema = new Schema({
    name: String,
    email: String,
    mobile : String,
    facebookid: String,
    twitterid : Number,
    createdon: {type: Date, 'default': Date.now},
    updatedon : {type : Date, 'default':Date.now},
    gender : String,
    dob : Date,
    college : {
        id: Number,
        name : String
    },
    location : {
        id: Number,
        name : String
        },
    facebook : {
        authorized : String,
        friends : [String],
        authcode :String
    },
    twitter :{
        authorized : Number,
        authcode : String,
        username : String,
        name :String,
        secret : String
    },
    role : Number,
    rolename :String,
    manager : { name:String,email:String,updatedon:{type: Date, 'default': Date.now},updatedby:String},
    points : Number,
    stages : [{stageid:String,
                name : String,
                completion: Number}],      //changed from number to objectid
    /*tasks  : [
               { stage: ObjectId,   //changed from number to objectid
                value : [ObjectId]  //changed from number to objectid
               }
             ], */
    user_tasks :[user_task_schema],
    vibes_transaction : [vibes_transaction_schema],
    type : {id : Number,
            name : String},
    verified : Number,
    auth : String,
    visitcount :Number,
    refercount :Number,
    referred_by: String,
    vcron :Number,
    c     :String
},
    { collection: 'students' })

exports.student = mongoose.model('Student', studentSchema);
exports.student_task = mongoose.model('Student_task',user_task_schema);
exports.vibes_transaction = mongoose.model('vibes_transaction',vibes_transaction_schema);

