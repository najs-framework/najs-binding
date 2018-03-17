"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassRegistry_1 = require("./ClassRegistry");
const ClassRegistryItem_1 = require("../private/ClassRegistryItem");
const lodash_1 = require("lodash");
const getClassName_1 = require("./getClassName");
const register_1 = require("./register");
function bind(abstract, concrete) {
    if (typeof concrete === 'undefined') {
        return create_decorator(abstract);
    }
    if (ClassRegistry_1.ClassRegistry.has(abstract)) {
        return update_concrete(abstract, concrete);
    }
    const item = new ClassRegistryItem_1.ClassRegistryItem(abstract, undefined, lodash_1.isFunction(concrete) ? concrete : undefined, undefined, undefined, undefined);
    if (lodash_1.isString(concrete)) {
        item.concreteClassName = concrete;
    }
    return ClassRegistry_1.ClassRegistry.register(item);
}
exports.bind = bind;
function update_concrete(abstract, concrete) {
    ClassRegistry_1.ClassRegistry.assertRegistryItemCouldBeUpdated(abstract);
    const item = ClassRegistry_1.ClassRegistry.findOrFail(abstract);
    if (lodash_1.isFunction(concrete)) {
        item.instanceCreator = concrete;
        return ClassRegistry_1.ClassRegistry.register(item);
    }
    item.concreteClassName = concrete;
    return ClassRegistry_1.ClassRegistry.register(item);
}
function create_decorator(abstract) {
    return function decorator(target) {
        const targetName = getClassName_1.getClassName(target);
        if (!ClassRegistry_1.ClassRegistry.has(targetName)) {
            register_1.register(target, targetName);
        }
        bind(abstract, targetName);
    };
}
