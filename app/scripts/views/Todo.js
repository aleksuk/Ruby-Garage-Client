/*global TODO, Backbone, JST*/

TODO.Views = TODO.Views || {};

(function () {
    'use strict';

    TODO.Views.Todo = Backbone.View.extend({

        template: JST['app/scripts/templates/Todo.ejs'],

        tagName: 'div',

        className: 'todo_list',

        events: {
            'click .edit_todo': 'showEditMode',
            'click .remove_todo': 'removeTodo',
            'click .save_header': 'savaChange',
            'click .cancel_header': 'cancelChange',
            'click .btn_add': 'addTask'
        },

        initialize: function () {
            this.collection = new TODO.Collections.Tasks();

            this.listenTo(this.model, 'invalid', this.failedValidation);
            this.listenTo(this.model, 'change', this.editHeaderTitle);
            this.listenToOnce(this.collection, 'sync', this.renderTasks);
            this.listenTo(this.collection, 'invalid', this.destroyFailedTask)

            this.collection.setUrl(this.model.id);
            this.collection.fetch();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        findNodes: function () {
            this.nodes = {
                $tasks: this.$('.tasks'),
                $headerTitle: this.$('.todo_name'),
                $headerMenu: this.$('.todo_title_editing'),
                $headerField: this.$('.title_field'),
                $addTaskField: this.$('.new_task')
            };
        },

        renderTasks: function () {
            this.findNodes();
            this.collection.each(this.renderOneTask, this);
            this.listenTo(this.collection, 'add', this.renderOneTask);
        },

        renderOneTask: function (taskModel) {
            var task = new TODO.Views.Task({
                model: taskModel
            });

            this.nodes.$tasks.append(task.render().el);
        },

        addTask: function () {
            this.collection.create({
                title: this.nodes.$addTaskField.val(),
                todo_id: this.model.id
            });

            this.clearTaskField();
        },

        destroyFailedTask: function (taskModel) {
            taskModel.destroy();
        },

        showEditMode: function () {
            this.nodes.$headerTitle.addClass('hide');
            this.nodes.$headerMenu.removeClass('hide');
        },

        showPreviewMode: function () {
            this.nodes.$headerTitle.removeClass('hide');
            this.nodes.$headerMenu.addClass('hide');
        },

        savaChange: function () {
            this.model.save('title', this.nodes.$headerField.val());

            this.showPreviewMode();
        },

        cancelChange: function () {
            this.nodes.$headerField.val(this.model.get('title'));

            this.showPreviewMode();
        },

        editHeaderTitle: function () {
            this.nodes.$headerTitle.html(this.model.get('title'));
        },

        failedValidation: function (model) {
            if (model === this.model) {
                this.clearHeaderInput();
            }

            Backbone.Mediator.pub('Error', model || this.model);
        },

        clearTaskField: function () {
            this.nodes.$addTaskField.val('');
        },

        clearHeaderInput: function () {
            this.nodes.$headerField.val(this.model.get('title'));
        },

        removeTodo: function () {
            this.collection.each(function (taskModel) {
                taskModel.destroy();
            });

            this.model.destroy();
            this.remove();
        }

    });

})();
