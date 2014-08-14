/**
 * Created by akshat on 5/6/14.
 */

var mongoose = require('mongoose');
//var aws = require('aws-sdk');
//
//aws.config.loadFromPath('./aws-config.json');
//
//// load AWS SES
//var ses = new aws.SES({apiVersion: '2010-12-01'});


exports.params = {
    Destination: { // required
        ToAddresses: [

        ]
    },
    Message: { // required
        Body: { // required
            Html: {
                Data: ''//, // required
                    //Charset: 'STRING_VALUE'
            }
        },
        Subject: { // required
            Data: ''//, required
            //Charset: 'STRING_VALUE'
        }
    },
    Source: 'hello@thegoodvibes.in', // required
    ReplyToAddresses: [
        'hello@thegoodvibes.in',
        // ... more items ...
    ],
    //ReturnPath: 'STRING_VALUE'
};


exports.sesmail= function(params){
    ses.sendEmail(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}









//mongoose.connect('mongodb://viber_app:akshat@ds033069.mongolab.com:33069/viber_backup_12_aug_12_18_pm');
//mongoose.connect('mongodb://viber_app:akshat@ds053449.mongolab.com:53449/viber_prod');

// exports.utils = require('../api/utils.js');
// exports.ObjectId =  mongoose.Types.ObjectId;

// exports.complement = function(number,cb){
//     console.log(number);

//     var secrettoken ='';
//     var count = number.length;
//     console.log('count' + count);
//     for(var c=0;c<=number.length-1;c++){
//         secrettoken += (9-parseInt((number.substr(c,1))));
//         if(c == (count-1)){
//             cb(null,secrettoken);
//         }
//     }

// }
