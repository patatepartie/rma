var State = require('ampersand-state');

module.exports = State.extend({
    props: {
        timestamp: {
            type: 'number',
            required: true,
            default: function() {
                return new Date().getTime();
            }
        }
    }
});
