define(["require", "exports", "TFS/WorkItemTracking/Services", "./model", "./view", "./errorView", "q"], function (require, exports, WitService, model_1, view_1, errorView_1, Q) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Controller = void 0;
    class Controller {
        constructor() {
            this._fieldName = "";
            this._markdown = "";
            this._script = "";
            this._initialize();
        }
        _initialize() {
            this._inputs = VSS.getConfiguration().witInputs;
            this._fieldName = this._inputs["FieldName"];
            this._markdown = this._inputs["Markdown"];
            this._script = this._inputs["Script"];
            WitService.WorkItemFormService.getService().then((service) => {
                Q.spread([service.getFieldValue(this._fieldName)], (currentValue) => {
                    service.setFieldValue(this._fieldName, currentValue);
                    this._model = new model_1.Model(currentValue);
                    this._view = new view_1.View(this._model, this._script, (val) => {
                        this._updateInternal(val);
                    });
                    this._view.update(currentValue, this._markdown);
                }, this._handleError).then(null, this._handleError);
            }, this._handleError);
        }
        _handleError(error) {
            new errorView_1.ErrorView(error);
        }
        _updateInternal(value) {
            WitService.WorkItemFormService.getService().then((service) => {
                service.setFieldValue(this._fieldName, value).then(() => {
                    this._update(value);
                }, this._handleError);
            }, this._handleError);
        }
        _update(value) {
            this._model.setCurrentValue(value);
            this._view.update(value, this._markdown);
        }
        updateExternal(value) {
            this._update(value);
        }
        getFieldName() {
            return this._fieldName;
        }
    }
    exports.Controller = Controller;
});
