"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClassName_1 = require("./getClassName");
const ClassRegistry_1 = require("./ClassRegistry");
function make(className, data) {
    return ClassRegistry_1.ClassRegistry.findOrFail(getClassName_1.getClassName(className)).make(data);
}
exports.make = make;
