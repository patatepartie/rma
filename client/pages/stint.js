var PageView = require('./base');
var templates = require('../templates');
var config = require('clientconfig');
var _ = require('underscore');
var Stint = require('../models/stint');
var State =  require('ampersand-state');
var Clock = require('../models/clock');
var TimeControlView = require('../views/time-control');

var StintTimeControl = State.extend({
    children: {
        clock: Clock,
        stint: Stint
    },
    derived: {
        startTime: {
            deps: ['stint.startTime'],
            fn: function() {
                return this.stint.startTime;
            }
        },
        endTime: {
            deps: ['stint.pitStopTime'],
            fn: function() {
                return this.stint.pitStopTime;
            }
        }
    }
});

module.exports = PageView.extend({
    pageTitle: 'stint',
    template: templates.pages.stint,
    
    initialize: function(specs) {
        this.clock = specs.clock;
        this.model = new Stint(_.pick(specs, 'startTime', 'pitStopTime'));
    },
    
    render: function() {
        this.renderWithTemplate();
        
        if (config.debugMode) {
            this.renderSubView(new TimeControlView({
                model: new StintTimeControl({
                    clock: this.clock,
                    stint: this.model
                })
            }), this.queryByHook('time-control'));
        }
    }
});
