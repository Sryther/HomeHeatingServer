module.exports = function(schedule, the_switch) {
    var startTask = {};
    var stopTask = {};

    module.setJob = function(startCron, stopCron) {
        module.cancelJobs(true, true);
        startTask = schedule.scheduleJob(startCron, function(){
            the_switch.trigger(true);
        });
        stopTask = schedule.scheduleJob(stopCron, function(){
            the_switch.trigger(false);
        });
        console.log('Add jobs');
    };

    module.cancelJobs = function (start, stop) {
        console.log('Cancel jobs : ' + start + ', ' + stop);
        if (start && startTask.cancel) startTask.cancel();
        if (stop && stopTask.cancel) stopTask.cancel();
    };

    return module;
};
