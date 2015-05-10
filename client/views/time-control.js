var View = require('ampersand-view');
var templates = require('../templates');
var moment = require('moment');

module.exports = View.extend({
    template: templates.includes.timeControl,
    derived: {
        formattedStartTime: {
            deps: ['model.startTime'],
            fn: function() {
                return moment(this.model.startTime).format('HH:mm:ss');
            }
        },
        formattedCurrentTime: {
            deps: ['model.currentTime'],
            cache: false,
            fn: function() {
                return moment(this.model.currentTime).format('HH:mm:ss');
            }
        },
        formattedEndTime: {
            deps: ['model.endTime'],
            fn: function() {
                return moment(this.model.endTime).format('HH:mm:ss');
            }
        }
    },
    bindings: {
        formattedStartTime: {
            hook: 'start-time'
        },
        formattedCurrentTime: {
            hook: 'current-time'
        },
        formattedEndTime: {
            hook: 'end-time'
        }
    }
});
