/*global TODO, Backbone, JST*/

TODO.Views = TODO.Views || {};

(function () {
    'use strict';

    TODO.Views.TodoList = Backbone.View.extend({

        template: JST['app/scripts/templates/TodoList.ejs'],

        initialize: function () {
            this.render();

            this.$contentNode = this.$('.content');

            this.listenToOnce(this.collection, 'sync', this.renderTodoLists);
            this.collection.fetch();
        },

        collection: new TODO.Collections.Todo(),

        events: {
            'click .add_todo': 'createNewTodo'
        },

        render: function () {
            this.$el.html(this.template());
        },

        renderTodoLists: function () {
            this.collection.each(this.renderOneTodo, this);
            this.listenTo(this.collection, 'add', this.renderOneTodo);
        },

        renderOneTodo: function (todoModel) {
            var todo = new TODO.Views.Todo({
                    model: todoModel
            });

            this.$contentNode.append(todo.render().el);
        },

        createNewTodo: function () {
            this.collection.create({}, {wait: true});
        },

    });

})();
