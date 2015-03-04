var app = require('express')();
var https = require('https');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var schedule = require('node-schedule');

var opts = {
    key: fs.readFileSync('./ssl/keys/heat.key'),
    cert: fs.readFileSync('./ssl/certificates/heat.pem')
};

var secret = "Str0ngS3cr3t"; // Or a file

// Configuration
app.use(morgan('dev')); // Log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(function (req, res, next) {
    // Comment this in production
    console.log(req.body);
    next();
});
app.use(methodOverride());

// Security - Call JWT on every url /api
app.use('/api', expressJwt({secret: secret}));


// Modules
var the_switch = require('./modules/the_switch')(fs);
var cron_persistant = require('./modules/cron_persistant')(schedule, the_switch);
var auth = require('./modules/auth')(fs, jwt, secret);
var api = require('./modules/api')(fs, cron_persistant, the_switch);

// TODO: Try trigger on start if needed

// Routes
app.post('/login', auth.attempt);
app.get('/api/settings', api.getSettings);
app.post('/api/settings', api.postSettings);

https.createServer(opts, app).listen(8000, function () {
    console.log('Server listening on port ', 8000);
});
