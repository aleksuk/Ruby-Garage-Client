/*global TODO, Backbone*/

TODO.Collections = TODO.Collections || {};

(function () {
    'use strict';

    TODO.Collections.Todo = Backbone.Collection.extend({

        url: '/todos',

        model: TODO.Models.Todo

    });

})();
