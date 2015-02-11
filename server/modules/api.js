module.exports = function () {
    module.redirect = function(req, res) {
        res.sendStatus(301);
        res.redirect('/api');
    };

    return module;
};
