/*global TODO, Backbone, JST*/

TODO.Views = TODO.Views || {};

(function () {
    'use strict';

    TODO.Views.Task = Backbone.View.extend({

        template: JST['app/scripts/templates/Task.ejs'],

        tagName: 'div',

        className: 'task',

        events: {
            'click .remove_task': 'destroy',
            'click .edit_task': 'showEditMode',
            'click .save_title': 'saveChange',
            'click .cancel_title': 'refreshChange',
            'change .is_complete': 'disableTask'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.removeTask);
            this.listenTo(this.model, 'invalid', this.failedValidation);
        },

        failedValidation: function (model) {
            Backbone.Mediator.pub('Error', model);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.findNodes();
            return this;
        },

        findNodes: function () {
            this.nodes = {
                $taskTitle: this.$('.task_title'),
                $editingMenu: this.$('.editing_menu'),
                $titleField: this.$('.title_field'),
                $deadlineField: this.$('.deadline_field')
            };

            this.initDatepicker();
        },

        initDatepicker: function () {
            this.nodes.$deadlineField.datepicker();
        },

        showEditMode: function () {
            if (!this.model.get('isComplete')) {
                this.nodes.$taskTitle.addClass('hide');
                this.nodes.$editingMenu.removeClass('hide');
            }
        },

        showPreviewMode: function () {
            this.nodes.$taskTitle.removeClass('hide');
            this.nodes.$editingMenu.addClass('hide');
        },

        saveChange: function () {
            this.model.save({
                title: this.nodes.$titleField.val(),
                deadline: this.nodes.$deadlineField.val()
            });

            this.refreshChange();
        },

        refreshChange: function () {
            this.nodes.$titleField.val(this.model.get('title'));
            this.nodes.$deadlineField.val(this.model.get('deadline'));

            this.showPreviewMode();
        },

        disableTask: function () {
            this.model.save('isComplete', true);
        },

        destroy: function () {
            this.model.destroy();
        },

        removeTask: function () {
            this.nodes.$deadlineField.datepicker('destroy');
            this.remove();
        }

    });

})();
