module.exports = function (fs, jwt, secret) {
    module.attempt = function(req, res) {
        var body = req.body;
        
        if (body.username == "" || body.password == "") {
            res.sendStatus(400);
        }

        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
            var cred = JSON.parse(data);
            if (cred.username == body.username && cred.password == body.password) {
                var token = jwt.sign(cred, secret, { expiresInMinutes: 3600 });
                res.json(token);
            } else {
                res.sendStatus(400);
            }
        });

    };

    return module;
};
