var express, students, data, app;
express = require('express');
students = require('./routes/students');
data = require('./routes/data');
app = express();

app.use(express.static('www'));
var manage = require("./routes/manageinterns.js");
var studentutils = require('./routes/student-utils.js');

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/students', students.findAll);
app.get('/students/:id', students.findById);
app.get('/students/:id/reports', students.findReports);
app.get('/data',data.level_1_100);
app.get('/data/:city',data.city)
app.get('/manage/getsubordinates/:email/:role', manage.getsubordinates);


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