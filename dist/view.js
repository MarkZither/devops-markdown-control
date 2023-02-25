define(["require", "exports", "./markdown"], function (require, exports, markdown_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.View = void 0;
    class View {
        constructor(model, script, onInputChanged) {
            this.model = model;
            this.script = script;
            this.onInputChanged = onInputChanged;
            this.currentValue = "";
            this._md = new markdown_1.Markdown(script);
            this._init();
        }
        _init() {
            $(".container").remove();
            var container = $("<div />");
            container.addClass("container");
            var control = $('<div />');
            control.addClass('control');
            var wrap = $("<div />");
            wrap.addClass("wrap");
            this.currentValue = String(this.model.getCurrentValue());
            var field = $("<input />").attr("type", "text");
            field.val(this.currentValue);
            field.attr("autocomplete", this.currentValue);
            field.attr("aria-valuenow", this.currentValue);
            field.on("keyup", (evt) => {
                this._inputChanged();
            }).on('focus', (evt) => {
                this._gotFocus();
            }).on('blur', (evt) => {
                this._lostFocus();
            });
            this._markdown = $('<div />');
            this._markdown.addClass('markdown-control');
            wrap.append(field);
            this._combo.append(wrap);
            control.append(this._markdown);
            container.append(control);
            $("body").append(container);
            VSS.resize(container.width(), container.height());
        }
        _inputChanged() {
            let newValue = $("input").val();
            if (this.onInputChanged) {
                this.onInputChanged(newValue);
            }
        }
        _gotFocus() {
            this._combo.addClass('focus');
        }
        _lostFocus() {
            this._combo.removeClass('focus');
        }
        update(value, markdown) {
            this.currentValue = String(value);
            $("input").val(this.currentValue);
            this._md.markdown(markdown).then(x => {
                var formatted = $(x);
                $('a', formatted).attr('target', '_blank');
                this._markdown.html(formatted.html());
            });
        }
    }
    exports.View = View;
});
