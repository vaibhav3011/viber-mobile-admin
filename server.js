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

app.use(express.static('www'));

var  util = require('util')
    , LocalStrategy = require('passport-local').Strategy;


var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));




// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


//app.get('/', function(req, res){
//    res.render('index', { user: req.user });
//});

app.get('/login', function(req, res){
    res.send("Wrong Username/Password");
});


// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.send(req.session)
    });

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
 app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
 if (err) { return next(err) }
 if (!user) {
 req.flash('error', info.message);
 return res.redirect('/login')
 }
 req.logIn(user, function(err) {
 if (err) { return next(err); }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });
 */

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


//routes

app.get('/city',ensureAuthenticated,city.city);
app.get('/data',ensureAuthenticated,data.level_1_100);
app.get('/students',ensureAuthenticated, students.findAll);
app.get('/messenger',ensureAuthenticated,messenger.people);
app.get('/zonalmanager',ensureAuthenticated,students.zonalmanagers);
app.get('/projectmanager',ensureAuthenticated,students.projectmanagers);
app.get('/data/:city',ensureAuthenticated,data.city);
app.get('/students/:id',ensureAuthenticated,students.findById);
app.get('/students/:id/reports',ensureAuthenticated,students.findReports);
app.get('/manage/getsubordinates/:email/:role',ensureAuthenticated, manage.getsubordinates);
app.get('/manage/delsubordinates/:email',ensureAuthenticated,)
app.get('/city/:city/:page',ensureAuthenticated,city.list);


// app.get('/manage/child/1',manage.test_addrandomroles);
// app.get('/manage/grandchild/1',manage.add_grandchild);
// app.get('/manage/view/s',manage.getsubordinates);

// app.get('/students/manage/interns',studentutils.getsubordinates);
// app.put('/students/manage/interns', studentutils.addsubordinates);
// app.put('/students/manage/interns/delete',studentutils.removesubordinate);
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    else {
        var p = ["notloggedin"];
        res.send(p);
    }
}

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});