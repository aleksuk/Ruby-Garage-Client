/*global TODO, Backbone, JST*/

TODO.Views = TODO.Views || {};

(function () {
    'use strict';

    TODO.Views.Error = Backbone.View.extend({

        template: JST['app/scripts/templates/Error.ejs'],

        tagName: 'div',

        className: 'error',

        subscriptions: {
            'Error': 'showError'
        },

        render: function (model) {
            this.$el.html(this.template(model));
            return this;
        },

        showError: function (model) {
            clearInterval(this.interval);
            
            this.render(model);
            this.$el.removeClass('hide');

            this.interval = setTimeout(this.hideError.bind(this), 5000);
        },

        hideError: function () {
            this.$el.addClass('hide');
        }

    });

})();
