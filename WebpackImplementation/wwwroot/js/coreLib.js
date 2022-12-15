import $ from "jquery";
import 'jquery-ui-bundle';
import { success, error, warning, info } from 'toastr';
import 'bootstrap';

export const coreLib = () => {
    var defaultNotifyOptions = {
        closeButton: true,
        timeOut: 3000,
        showDuration: 250,
        hideDuration: 500,
        extendedTimeOut: 500,
        positionClass: 'toast-top-right'
    };
    const notify = (statusCode, message, title, options) => {
        switch (statusCode) {
            case -1: error(message, title, getToastrOptions(options));
                break;
            case 1: success(message, title, getToastrOptions(options));
                break;
            case 2: warning(message, title, getToastrOptions(options));
                break;
            default: info(message, title, getToastrOptions(options));
                break;
        }
    }

    
    function getToastrOptions(options) {
        function positionToastContainer(create) {
            if (typeof toastr === 'undefined') {
                return;
            }
            var dialog = $(window.document.body).children('.ui-dialog:visible').last();
            var container = toastr.getContainer(null, create);
            if (container.length === 0) {
                return;
            }
            if (dialog.length > 0) {
                var position = dialog.position();
                container.addClass('positioned-toast toast-top-full-width');
                container.css({ position: 'absolute', top: position.top + 28 + 'px', left: position.left + 6 + 'px', width: dialog.width() - 12 + 'px' });
            }
            else {
                container.addClass('toast-top-full-width');
                if (container.hasClass('positioned-toast')) {
                    container.removeClass('positioned-toast');
                    container.css({ position: '', top: '', left: '', width: '' });
                }
            }
        }
        options = $.extend({}, defaultNotifyOptions, options);
        positionToastContainer(false);
        return options;
    }

    const dialog = (options) => {
        var dialog;
        let maxWidth = $(window).width();
        if (options.hasOwnProperty('maxWidth')) {
            maxWidth = options.maxWidth != '' && options.maxWidth >= maxWidth ? maxWidth : options.maxWidth;
        }
        if (options.top == null || options.top == '') {
            var pos = $('.seen').position();
            options.top = pos?.top + 200;
        }
        options = $.extend({
            htmlEncode: false,
            isOkButton: false,
            okButton: 'Ok',
            title: '',
            body: '',
            onClose: null,
            onOpen: null,
            autoOpen: false,
            dialogClass: 's-MessageDialog s-AlertDialog',
            modal: true,
            create: function (e, ui) {
                var that = $(this);
                var dlg = $(this).dialog("widget");
                //var min = $("<button>", {
                //    class: "ui-dialog-titlebar-min d-none",
                //    type: "button",
                //    title: "Minimize"
                //}).button({
                //        icon: "ui-icon-minusthick",
                //        showLabel: false
                //    });
                var max = $("<button>", {
                    class: "ui-dialog-titlebar-max",
                    type: "button",
                    title: "Maximize",
                    text: '🗖'
                }).button({
                    /*icon: "ui-icon-arrowthick-2-ne-sw",*/
                    showLabel: false
                });
                var oSize = {
                    width: that.dialog("option", "width"),
                    height: that.dialog("option", "height"),
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    }
                };
                var mSize = {
                    width: $(window).width(),
                    height: $(window).height(),
                    position: {
                        my: "left top",
                        at: "left top",
                        of: window
                    }
                };
                //min.click(function (e) {
                //    $('.ui-dialog-titlebar-max,.ui-dialog-titlebar-min').toggleClass('d-none');
                //    that.dialog("option", oSize);
                //});
                max.click(function (e) {
                    let cls = $(e.currentTarget).attr('class');
                    if (cls.includes('restoreWindow')) {
                        that.dialog("option", oSize);
                    }
                    else {
                        that.dialog("option", mSize);
                    }
                    $(e.currentTarget).toggleClass('restoreWindow');
                    $('.ui-button-icon').toggleClass('ui-icon-arrowthick-2-ne-sw ui-icon-minusthick');
                });
                $(".ui-dialog-titlebar .ui-dialog-title", dlg).after(max);
                //$(".ui-dialog-titlebar .ui-dialog-title", dlg).after(min,max);
            },
            width: '540px',
            maxWidth: maxWidth,
            minWidth: '25%',
            fluid: true,
            responsive: true,
            top: options.top,
            resizable: true,
            open: function () {
                if (options.onOpen)
                    options.onOpen.call(this);
                if (options.top !== undefined && options.top !== '')
                    $('.ui-dialog').css({ 'top': options.top })
                $('.ui-dialog-titlebar-close').text('✖');
            },
            close: function () {
                dialog.dialog('destroy');
                if (options.onClose)
                    options.onClose();
            }
        }, options);

        if (options.htmlEncode)
            options.body = Q.htmlEncode(options.body);
        if (!options.buttons && options.isOkButton) {
            var buttons = [];
            buttons.push({
                text: options.okButton,
                click: function () {
                    dialog.dialog('close');
                }
            });
            options.buttons = buttons;
        }

        dialog = $('<div><div class="message"><\/div><\/div>')
            .dialog(options)
            .children('.message')
            .html(options.body)
            .parent()
            .dialog('open');
    };

    return {
        notify, dialog
    }
}