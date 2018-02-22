"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const ClassRegistry_1 = require("./ClassRegistry");
const get_class_name_1 = require("../private/get_class_name");
const lodash_1 = require("lodash");
function extend(abstract, extendingFunction) {
    if (typeof extendingFunction === 'undefined') {
        return function (target) {
            extend(abstract, function (instance) {
                return Reflect.construct(target, [instance]);
            });
        };
    }
    const className = get_class_name_1.get_class_name(abstract);
    if (lodash_1.isFunction(abstract) && !ClassRegistry_1.ClassRegistry.has(className)) {
        register_1.register(abstract, className);
    }
    const item = ClassRegistry_1.ClassRegistry.findOrFail(className);
    item.instanceExtending = extendingFunction;
}
exports.extend = extend;
