/*global TODO, Backbone*/

TODO.Models = TODO.Models || {};

(function () {
    'use strict';

    TODO.Models.Todo = Backbone.Model.extend({

        defaults: {
            title: 'Complete the test task for Ruby Garage'
        },

        validate: function(attrs, options) {
            if (attrs.title.trim().length < 5) {
                return 'The TODO name is too short!'
            }
        }

    });

})();
