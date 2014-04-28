/*global TODO, Backbone*/

TODO.Models = TODO.Models || {};

(function () {
    'use strict';

    TODO.Models.Task = Backbone.Model.extend({

        defaults: {
            title: '',
            deadline: '',
            todo_id: '',
            isComplete: false
        },

        validate: function(attrs, options) {
            if (attrs.title.trim().length < 5) {
                return 'The task name is too short!';
            }
        }
        
    });

})();
