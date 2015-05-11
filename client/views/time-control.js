var View = require('ampersand-view');
var templates = require('../templates');
var moment = require('moment');
var app = require('ampersand-app');

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
        },
        'model.startTime': {
            type: 'attribute',
            name: 'min',
            hook: 'seek-bar'
        },
        'model.currentTime': {
            type: 'value',
            hook: 'seek-bar'
        },
        'model.endTime': {
            type: 'attribute',
            name: 'max',
            hook: 'seek-bar'
        }
    },

    events: {
        'input [data-hook=seek-bar]': 'seekTime',
        'change [data-hook=seek-bar]': 'releaseFocus'
    },

    seekTime: function() {
        var newTime = parseInt(this.queryByHook('seek-bar').value, 10);
        app.trigger("time:changed", newTime)
    },

    releaseFocus: function() {
        // Otherwise the seek bar stop being updated by changes of the clock,
        // until the user clicks somewhere outside the seek bar
        this.queryByHook('seek-bar').blur();
    }
});
