module.exports = function (fs) {
    module.getSettings = function(req, res) {
        fs.readFile(__dirname + "/../data/settings.json", 'utf8', function(err, data) {
            res.send(JSON.parse(data));
        });
    }

    module.postSettings = function(req, res) {
        var settings = req.body.settings;

        fs.writeFile(__dirname + "/../data/settings.json", JSON.stringify(settings), function (err) {
            if (err) return console.log(err);
            res.sendStatus(200);
        });

    }

    return module;
};
