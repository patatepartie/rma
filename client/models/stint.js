var State = require('ampersand-state');

module.exports = State.extend({
    props: {
        startTime: ['date', true],
        pitStopTime: ['date', true]
    }
});
