"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const make_1 = require("./make");
function autoload(className) {
    return function (target, key, descriptor) {
        if (typeof target === 'function') {
            throw new TypeError('Could not apply autoload decorator to Class');
        }
        if (typeof descriptor !== 'undefined') {
            throw new TypeError('Could not apply autoload decorator to Method');
        }
        Object.defineProperty(target, key, {
            get: function () {
                if (typeof this.__autoload === 'undefined') {
                    this.__autoload = {};
                }
                if (typeof this.__autoload[className] === 'undefined') {
                    this.__autoload[className] = make_1.make(className);
                }
                if (this.__autoloadContext) {
                    if (this.__autoload[className].__autoloadContext) {
                        Object.assign(this.__autoload[className].__autoloadContext, this.__autoloadContext);
                    }
                    else {
                        this.__autoload[className].__autoloadContext = this.__autoloadContext;
                    }
                }
                return this.__autoload[className];
            },
            set: function (value) {
                throw new Error('Can not set autoload property "' + key + '"');
            }
        });
    };
}
exports.autoload = autoload;
