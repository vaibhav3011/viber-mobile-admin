
var mongoose = require('mongoose');
mongoose.connect('mongodb://viber_app:akshat@ds053449.mongolab.com:53449/viber_prod');
var studentSchema = require('../models/studentmodel.js');
var Students = studentSchema.student;
console.log(Students);


exports.findAll = function (req, res, next) {
    var name = req.query.name;
     
    if (name) {
        
        Students.findOne({'email': name},function(err,student) {
           // return (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1;
           console.log(student);
           if(student){
               var resarry=[student];
               res.send(JSON.stringify(resarry));
           }
           else res.send('No Data found');
        });
    } else {
        
      var q=  Students.find({}).sort({'updatedon':-1}).limit(50);
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
        
        
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    
     var q=  Students.find({'facebookid': id}).sort({'updatedon':-1}).limit(50);
      q.exec(function(err,Students){
           
           if(!err && Students.length > 0)
           {
                    
                    res.send(JSON.stringify(Students[0]));
                    
           }
           else 
           {        console.log(err);
                    res.send(err);
           }
            
        });
    
    
};

exports.findReports = function (req, res, next) {
    var email = req.params.email;
    
    
    
      var q=  Students.find({'manager.email': email}).sort({'updatedon':-1});
      q.exec(function(err,Students){
           
           if(!err)
           {
                    
                    res.send(JSON.stringify(Students));
                    
           }
           else console.log(err);
           res.send(err);
            
        });
    
    
};