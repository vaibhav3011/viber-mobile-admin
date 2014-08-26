var express = require('express');
var students = require('./routes/students');
var data = require('./routes/data.js');
var app = express();
var manage = require("./routes/manageinterns.js");
var messenger=require('./routes/messenger.js');
var city= require('./routes/city.js');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
//setting up the environment
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



//routes
app.get('/city',isLoggedIn,city.city);
app.get('/data',isLoggedIn,data.level_1_100);
app.get('/students',isLoggedIn, students.findAll);
app.get('/messenger',isLoggedIn,messenger.people);
app.get('/data/:city',isLoggedIn,data.city);
app.get('/students/:id',isLoggedIn,students.findById);
app.get('/students/:id/reports',isLoggedIn,students.findReports);
app.get('/manage/getsubordinates/:email/:role',isLoggedIn, manage.getsubordinates);
app.get('/city/:city/:page',isLoggedIn,city.list);


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