var State = require('ampersand-state');
var _ = require('underscore');

function tick() {
    var now = new Date().getTime(),
        timeDifference = now - this.lastSample;

    this.lastSample = now;
    this.timestamp += timeDifference;
}

module.exports = State.extend({
    props: {
        timestamp: {
            type: 'number',
            default: function() {
                return new Date().getTime();
            }
        },
        started: {
            type: 'boolean',
            default: true
        }
    },

    session: {
        timerId: {
            type: 'number'
        },

        lastSample: {
            type: 'number',
            default: function() {
                return new Date().getTime();
            }
        }
    },

    initialize: function() {
        this.start();
    },

    start: function() {
        if (this.started) {
            this.timerId = setInterval(_.bind(tick, this), 100);
        }
    },

    stop: function() {
        if (this.started) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
});
