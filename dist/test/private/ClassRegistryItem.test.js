"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../lib");
describe('ClassRegistryItem', function () {
    describe('private .createInstance()', function () {
        let Original = class Original {
            constructor(value) {
                this.value = value;
            }
        };
        Original.className = 'Original';
        Original = __decorate([
            lib_1.register()
        ], Original);
        it('returns undefined if there is concreteClassName but concreteClass not register yet', function () {
            class Final1 {
            }
            Final1.className = 'Final1';
            lib_1.bind(Original.className, Final1.className);
            expect(lib_1.ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeUndefined();
        });
        it('skips instance... values if has concreteClassName', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail(Original.className);
            classRegistryItem.instanceCreator = function () {
                return new Date();
            };
            expect(lib_1.ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeUndefined();
        });
        it('returns createInstance of ClassRegistryItem with concreteClassName', function () {
            let Final = class Final extends Original {
            };
            Final.className = 'Final';
            Final = __decorate([
                lib_1.register()
            ], Final);
            lib_1.bind(Original.className, Final.className);
            expect(lib_1.ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeInstanceOf(Final);
            const instance = lib_1.ClassRegistry.findOrFail(Original.className)['createInstance'](['test']);
            expect(instance.value).toEqual('test');
        });
        it('creates instance from instanceConstructor if it set', function () {
            let Test = class Test {
            };
            Test.className = 'Test';
            Test = __decorate([
                lib_1.register()
            ], Test);
            expect(lib_1.ClassRegistry.findOrFail('Test')['createInstance']()).toBeInstanceOf(Test);
        });
        it('creates instance from instanceConstructor with arguments if it set', function () {
            let TestArgs = class TestArgs {
                constructor(value) {
                    this.value = value;
                }
            };
            TestArgs.className = 'TestArgs';
            TestArgs = __decorate([
                lib_1.register()
            ], TestArgs);
            const instance = lib_1.ClassRegistry.findOrFail('TestArgs')['createInstance']([{ arg: 'anything' }]);
            expect(instance).toBeInstanceOf(TestArgs);
            expect(instance.value).toEqual({ arg: 'anything' });
        });
        it('creates instance from instanceCreator if instanceConstructor not found', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail('Test');
            classRegistryItem.instanceConstructor = undefined;
            classRegistryItem.instanceCreator = function () {
                return new Date();
            };
            expect(classRegistryItem['createInstance']()).toBeInstanceOf(Date);
        });
        it('return instance if instanceConstructor and instanceCreator not found and singleton is true', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail('Test');
            classRegistryItem.instanceConstructor = undefined;
            classRegistryItem.instanceCreator = undefined;
            classRegistryItem.instance = new Date();
            classRegistryItem.singleton = true;
            expect(classRegistryItem['createInstance']()).toBeInstanceOf(Date);
        });
        it('return undefined if instanceConstructor and instanceCreator not found', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail('Test');
            classRegistryItem.instanceConstructor = undefined;
            classRegistryItem.instanceCreator = undefined;
            classRegistryItem.singleton = false;
            expect(classRegistryItem['createInstance']()).toBeUndefined();
        });
    });
    describe('private .extendInstance()', function () {
        it('does nothing, just return instance if there is no instanceExtending', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail('Test');
            expect(classRegistryItem['extendInstance']('test') === 'test').toBe(true);
            expect(classRegistryItem['extendInstance'](1) === 1).toBe(true);
            const instance = {};
            expect(classRegistryItem['extendInstance'](instance) === instance).toBe(true);
        });
        it('passes instance to instanceExtending() and returns result', function () {
            const classRegistryItem = lib_1.ClassRegistry.findOrFail('Test');
            class WrappedClass {
                constructor(instance) {
                    this.instance = instance;
                }
            }
            const instance = {};
            classRegistryItem.instanceExtending = function (arg) {
                return new WrappedClass(arg);
            };
            expect(classRegistryItem['extendInstance'](instance) === instance).toBe(false);
            expect(classRegistryItem['extendInstance'](instance)).toBeInstanceOf(WrappedClass);
            expect(classRegistryItem['extendInstance'](instance)['instance'] === instance).toBe(true);
        });
        it('just extends and wrap singleton 1 times', function () {
            let Singleton1 = class Singleton1 {
                constructor(value) {
                    this.value = value;
                }
            };
            Singleton1.className = 'Singleton1';
            Singleton1 = __decorate([
                lib_1.singleton()
            ], Singleton1);
            class WrappedClass {
                constructor(instance) {
                    this.instance = instance;
                }
            }
            const classRegistryItem = lib_1.ClassRegistry.findOrFail(Singleton1.className);
            classRegistryItem.instanceExtending = function (arg) {
                return new WrappedClass(arg);
            };
            const instance = classRegistryItem.make();
            expect(instance).toBeInstanceOf(WrappedClass);
            expect(instance['instance']).toBeInstanceOf(Singleton1);
            expect(classRegistryItem.make() === instance).toBe(true);
            expect(classRegistryItem.make() === instance).toBe(true);
            expect(classRegistryItem.make() === instance).toBe(true);
            expect(classRegistryItem.make() === instance).toBe(true);
            expect(classRegistryItem.make() === instance).toBe(true);
        });
    });
});
