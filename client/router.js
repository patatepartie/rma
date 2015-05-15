var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collection-demo');
var InfoPage = require('./pages/info');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonViewPage = require('./pages/person-view');
var StintPage = require('./pages/stint');
var moment = require('moment');
var Clock = require('./models/clock')

function parseSimpleTime(simpleTimeExpression) {
    var date = simpleTimeExpression.substr(0, 2),
        time = simpleTimeExpression.substr(2);
    return moment(time, "HHmmss").toDate();
}

module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        'race/stint/:startTime/:pitStopTime': 'currentStint',
        'simulation/stint': 'simulateStint',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            model: app.me
        }));
    },

    collectionDemo: function () {
        app.trigger('page', new CollectionDemo({
            model: app.me,
            collection: app.people
        }));
    },

    info: function () {
        app.trigger('page', new InfoPage({
            model: app.me
        }));
    },

    personAdd: function () {
        app.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        app.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        app.trigger('page', new PersonViewPage({
            id: id
        }));
    },

    currentStint: function(startTime, pitStopTime) {
        app.trigger('page', new StintPage({
            startTime: startTime,
            pitStopTime: pitStopTime,
            clock: app.clock
        }));
    },

    simulateStint: function() {
        var startTime = parseSimpleTime('TD104000');

        app.trigger('page', new StintPage({
            startTime: startTime,
            pitStopTime: parseSimpleTime('TD110000'),
            clock: new Clock({
                timestamp: startTime.getTime(),
                started: true
            })
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
