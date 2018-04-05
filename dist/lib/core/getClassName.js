"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function getClassName(classDefinition, allowString = true) {
    if (allowString && lodash_1.isString(classDefinition)) {
        return classDefinition;
    }
    if (lodash_1.isFunction(classDefinition.prototype.getClassName)) {
        return classDefinition.prototype.getClassName.call(classDefinition);
    }
    if (lodash_1.isString(classDefinition.className)) {
        return classDefinition.className;
    }
    if (!process.env.OBFUSCABLE_CHECK) {
        return classDefinition.name;
    }
    throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition);
}
exports.getClassName = getClassName;
