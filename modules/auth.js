module.exports = function (jwt) {
    module.attempt = function(req, res) {
        var body = req.body;
        if (body.username == "" || body.password == "") {
            res.sendStatus(400);
            res.end();
        }


        // TODO check in db

        var token = jwt.sign(profile, secret, { expiresInMinutes: time });
        res.json(token);
    };

    return module;
};
