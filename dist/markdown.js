var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "markdown-it", "TFS/WorkItemTracking/Services"], function (require, exports, MarkdownIt, Services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Markdown = void 0;
    class Markdown {
        constructor(script) {
            this.script = script;
            this._md = new MarkdownIt();
            if (script) {
                this._func = new Function('return ' + script)();
            }
        }
        processString(str) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!str) {
                    return str;
                }
                console.log("str is: " + str);
                const fieldValueRegex = /\${@fieldValue=\w[\w\s\d]*\w}/gi;
                const matches = str.match(fieldValueRegex);
                if (matches && matches.length > 0) {
                    let returnStr = str;
                    const fieldValues = yield Promise.all(matches.map((m) => __awaiter(this, void 0, void 0, function* () {
                        const fieldName = m
                            .replace("${@fieldValue=", "")
                            .replace("}", "")
                            .trim();
                        const fieldValue = yield this.getFieldValue(fieldName);
                        console.log("fieldName is: " + fieldName);
                        console.log("fieldValue is: " + fieldValue);
                        if (this._func) {
                            return this._func(fieldName, fieldValue);
                        }
                        else {
                            return fieldValue;
                        }
                    })));
                    matches.forEach((m, i) => {
                        const fieldValue = fieldValues[i] || "";
                        returnStr = returnStr.replace(m, fieldValue.toString());
                    });
                    return returnStr;
                }
                else {
                    return str;
                }
            });
        }
        getFieldValue(fieldName) {
            return __awaiter(this, void 0, void 0, function* () {
                const formService = yield Services_1.WorkItemFormService.getService();
                fieldName = fieldName.toLowerCase();
                if (fieldName == "id") {
                    return formService.getId();
                }
                try {
                    const fields = yield formService.getFields();
                    const field = fields.filter(x => x.name.toLowerCase() == fieldName)[0];
                    if (field) {
                        return yield formService.getFieldValue(field.referenceName);
                    }
                    else {
                        return null;
                    }
                }
                catch (_a) {
                    return null;
                }
            });
        }
        markdown(markdown) {
            return __awaiter(this, void 0, void 0, function* () {
                const translatedText = yield this.processString(markdown);
                console.log("translatedText is: " + translatedText);
                return this._md.render(translatedText);
            });
        }
    }
    exports.Markdown = Markdown;
});
