/*global TODO, $*/

window.TODO = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        var main = new this.Views.TodoList({
                el: $('.main_container')
            }),
        
            error = new this.Views.Error({
                el: $('.error')
            });
    }
};

$(function () {
    'use strict';
    TODO.init();
});
