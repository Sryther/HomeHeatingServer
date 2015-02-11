var app = require('express')();
var https = require('https');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');

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
var auth = require('./modules/auth')(jwt);
var api = require('./modules/api')();

// Routes
app.get('/', api.redirectHome);
app.post('/login', auth.attempt);
app.get('/api', api.getHome);

https.createServer(opts, app).listen(8000, function () {
    console.log('Server listening on port ', 8000);
});
