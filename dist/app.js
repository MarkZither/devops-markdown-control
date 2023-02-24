define(["require", "exports", "./control", "TFS/WorkItemTracking/Services"], function (require, exports, control_1, Services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(window).bind("keydown", function (event) {
        if (event.ctrlKey || event.metaKey) {
            if (String.fromCharCode(event.which) === "S") {
                event.preventDefault();
                Services_1.WorkItemFormService.getService().then((service) => service.beginSaveWorkItem($.noop, $.noop));
            }
        }
    });
    var control;
    var provider = () => {
        return {
            onLoaded: (workItemLoadedArgs) => {
                control = new control_1.Controller();
            },
            onFieldChanged: (fieldChangedArgs) => {
                var changedValue = fieldChangedArgs.changedFields[control.getFieldName()];
                if (changedValue !== undefined) {
                    control.updateExternal(changedValue);
                }
            }
        };
    };
    VSS.register(VSS.getContribution().id, provider);
});
