var express = require('express');
var students = require('./routes/students');
var data = require('./routes/data.js');
var app = express();
var manage = require("./routes/manageinterns.js");
var messenger=require('./routes/messenger.js');
var city= require('./routes/city.js');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var cookieParser= require('cookie-Parser');
var methodOverride = require('method-override');
var passport  = require('passport');
var session = require('express-session');

var flash = require('connect-flash')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;

//setting up the environment
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride());
app.use(express.static('www'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var users = [
    { id: 1, username: 'viber-mobile-admin', password: 'viber-mobile-admin', email: 'harshpatel19@gmail.com' }
    , { id: 2, username: 'mobile-admin', password: 'mobile-admin', email: 'harsh.letsintern@gmail.com' }
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


app.get('/login', function(req, res){
    res.render('login', { user: req.user, message: req.flash('error') });
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
        res.redirect('/search');
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
app.get('/city',city.city);
app.get('/data',data.level_1_100);
app.get('/students', students.findAll);
app.get('/messenger',messenger.people);
app.get('/data/:city',data.city);
app.get('/students/:id',students.findById);
app.get('/students/:id/reports',students.findReports);
app.get('/manage/getsubordinates/:email/:role', manage.getsubordinates);
app.get('/city/:city/:page',city.list);


// app.get('/manage/child/1',manage.test_addrandomroles);
// app.get('/manage/grandchild/1',manage.add_grandchild);
// app.get('/manage/view/s',manage.getsubordinates);

// app.get('/students/manage/interns',studentutils.getsubordinates);
// app.put('/students/manage/interns', studentutils.addsubordinates);
// app.put('/students/manage/interns/delete',studentutils.removesubordinate);


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});