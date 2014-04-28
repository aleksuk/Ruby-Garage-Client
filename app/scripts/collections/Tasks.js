/*global TODO, Backbone*/

TODO.Collections = TODO.Collections || {};

(function () {
    'use strict';

    TODO.Collections.Tasks = Backbone.Collection.extend({

        model: TODO.Models.Task,

        setUrl: function (id) {
            this.url = '/todo/tasks/' + id;
        }

    });

})();
