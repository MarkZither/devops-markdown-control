define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(_currentValue) {
            this._currentValue = _currentValue;
        }
        setCurrentValue(value) {
            if (value === undefined) {
                throw "Undefined value";
            }
            this._currentValue = value;
        }
        getCurrentValue() {
            return this._currentValue;
        }
    }
    exports.Model = Model;
});
