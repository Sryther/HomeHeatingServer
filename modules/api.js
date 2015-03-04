module.exports = function (fs, cron_persistant, the_switch) {
    module.getSettings = function(req, res) {
        fs.readFile(__dirname + "/../data/settings.json", 'utf8', function(err, data) {
            res.send(JSON.parse(data));
        });
    };

    module.postSettings = function(req, res) {
        var settings = req.body;

        // Mode Auto
        if (settings.auto) {
            startCron = settings.hours.back.m + ' ' + settings.hours.back.h + ' * * *';
            stopCron = settings.hours.leave.m + ' ' + settings.hours.leave.h + ' * * *';
            cron_persistant.setJob(startCron, stopCron);
        } else {
            cron_persistant.cancelJobs(true, true);
            the_switch.trigger(settings.state);
        }

        fs.writeFile(__dirname + "/../data/settings.json", JSON.stringify(settings), function (err) {
            if (err) return console.log(err);
            res.sendStatus(200);
        });

    };

    return module;
};
