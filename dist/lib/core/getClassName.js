"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.logger = console;
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
    if (isFalsy(process.env.OBFUSCABLE_CHECK)) {
        if (typeof process.env.OBFUSCABLE_WARNING === 'undefined' || !isFalsy(process.env.OBFUSCABLE_WARNING)) {
            exports.logger.warn('Class', '"' + classDefinition.name + '"', 'may not be used if you uglify (obfuscate) your script.');
        }
        return classDefinition.name;
    }
    throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition);
}
exports.getClassName = getClassName;
function isFalsy(value) {
    if (typeof value === 'undefined') {
        return true;
    }
    switch (value.toLowerCase().trim()) {
        case '':
        case '0':
        case 'false':
        case 'no':
            return true;
    }
    return false;
}
function setLogger(log) {
    exports.logger = log;
}
exports.setLogger = setLogger;
