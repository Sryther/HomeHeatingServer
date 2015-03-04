module.exports = function(fs) {
    module.trigger = function(newState) {
        fs.readFile(__dirname + "/../data/settings.json", 'utf8', function(err, data) {
            var settings = JSON.parse(data);

            if (settings.state != newState) {
                console.log('Relay switched from ' + settings.state + ' to ' + newState);
                // TODO: Trigger the relay
                settings.state = newState;
            } else {
                console.log('Relay already ' + settings.state);
            }
        });
    };

    return module;
};
