module.exports = function () {
    module.redirectHome = function(req, res) {
        res.sendStatus(301);
        res.redirect('/api');
    };

    module.getHome = function(req, res) {
        res.sendStatus(200);
        res.end();
    }

    return module;
};
