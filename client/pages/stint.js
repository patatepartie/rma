var PageView = require('./base');
var templates = require('../templates');
var config = require('clientconfig');
var _ = require('underscore');
var Stint = require('../models/stint');
var State =  require('ampersand-state');
var Clock = require('../models/clock');
var TimeControlView = require('../views/time-control');
var app = require('ampersand-app');

var StintTimeControl = State.extend({
    props: {
        clock: 'state',
        stint: 'state'
    },

    derived: {
        startTime: {
            deps: ['stint.startTime'],
            fn: function() {
                return this.stint.startTime.getTime();
            }
        },
        currentTime: {
            deps: ['clock.timestamp'],
            cache: false,
            fn: function() {
                return this.clock.timestamp;
            }
        },
        endTime: {
            deps: ['stint.pitStopTime'],
            fn: function() {
                return this.stint.pitStopTime.getTime();
            }
        }
    },

    initialize: function() {
        this.listenTo(this.clock, 'change:timestamp', function() {
            if (this.clock.timestamp >= this.endTime) {
                this.clock.stop();
            }
        });
    }
});

module.exports = PageView.extend({
    pageTitle: 'stint',
    template: templates.pages.stint,

    subviews: {
        timeControl: {
            hook: 'simulation',
            waitFor: 'model',
            prepareView: function(el) {
                return new TimeControlView({
                    el: el,
                    model: new StintTimeControl({
                        clock: this.clock,
                        stint: this.model
                    })
                });
            }
        }
    },

    initialize: function(specs) {
        this.clock = specs.clock;
        this.model = new Stint(_.pick(specs, 'startTime', 'pitStopTime'));

        app.on('time:changed', function(newTime) {
            this.clock.timestamp = newTime;
        }, this);
    }
});
