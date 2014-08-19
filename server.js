var express = require('express');
var students = require('./routes/students');
var data = require('./routes/data.js');
var app = express();
var manage = require("./routes/manageinterns.js");
var messenger=require('./routes/messenger.js');
var city= require('./routes/city.js');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride());
app.use(express.static('www'));
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//routes
app.get('/city',city.city);
app.get('/data',data.level_1_100);
app.get('/students', students.findAll);
app.get('/messenger',messenger.people);
app.get('/data/:city',data.city);
app.get('/students/:id', students.findById);
app.get('/students/:id/reports', students.findReports);
app.get('/manage/getsubordinates/:email/:role', manage.getsubordinates);
app.get('/city/:city/:page',city.list);


// app.get('/manage/child/1',manage.test_addrandomroles);
// app.get('/manage/grandchild/1',manage.add_grandchild);
// app.get('/manage/view/s',manage.getsubordinates);

// app.get('/students/manage/interns',studentutils.getsubordinates);
// app.put('/students/manage/interns', studentutils.addsubordinates);
// app.put('/students/manage/interns/delete',studentutils.removesubordinate);


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});