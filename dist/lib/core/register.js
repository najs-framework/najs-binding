"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClassName_1 = require("./getClassName");
const ClassRegistryItem_1 = require("../private/ClassRegistryItem");
const ClassRegistry_1 = require("./ClassRegistry");
const lodash_1 = require("lodash");
function register(classDefinition, className, overridable, singleton) {
    if (typeof classDefinition === 'undefined' || lodash_1.isString(classDefinition)) {
        return function decorator(target) {
            register(target, classDefinition);
        };
    }
    const item = new ClassRegistryItem_1.ClassRegistryItem(className || getClassName_1.getClassName(classDefinition, false), classDefinition, undefined, undefined, overridable, singleton);
    ClassRegistry_1.ClassRegistry.register(item);
}
exports.register = register;
