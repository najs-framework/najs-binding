"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const getClassName_1 = require("../../lib/core/getClassName");
describe('.getClassName()', function () {
    it('returns classDefinition if it is a string and allowString = true', function () {
        expect(getClassName_1.getClassName('Test', true)).toEqual('Test');
    });
    it('returns .getClassName() if it exists', function () {
        class Test {
            getClassName() {
                return 'GetClassName';
            }
        }
        Test.className = 'className';
        expect(getClassName_1.getClassName(Test)).toEqual('GetClassName');
    });
    it('returns Function.className if it exists and .getClassName() not exists', function () {
        class Test {
        }
        Test.className = 'className';
        expect(getClassName_1.getClassName(Test)).toEqual('className');
    });
    describe('class which has no .getClassName() and static className', function () {
        it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy', function () {
            delete process.env.OBFUSCABLE_CHECK;
            const customLogger = {
                warn() { }
            };
            getClassName_1.setLogger(customLogger);
            class Class {
            }
            expect(getClassName_1.getClassName(Class)).toEqual('Class');
        });
        const falsyValues = ['', '0', 'false', 'no'];
        for (const falsyValue of falsyValues) {
            it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy = ' + falsyValue, function () {
                process.env.OBFUSCABLE_CHECK = falsyValue;
                const customLogger = {
                    warn() { }
                };
                getClassName_1.setLogger(customLogger);
                class Class {
                }
                expect(getClassName_1.getClassName(Class)).toEqual('Class');
            });
        }
        it('throws an TypeError if process.env.OBFUSCABLE_CHECK is set', function () {
            process.env.OBFUSCABLE_CHECK = true;
            try {
                class Class {
                }
                expect(getClassName_1.getClassName(Class)).toEqual('Class');
            }
            catch (error) {
                expect(error).toBeInstanceOf(TypeError);
                expect(error.message.indexOf('Please define "className" or "getClassName" for') === 0).toBe(true);
                delete process.env.OBFUSCABLE_CHECK;
                return;
            }
            expect('should not reach this line').toEqual('hmm');
        });
        it('displays the warning message if process.env.OBFUSCABLE_WARNING is not found', function () {
            delete process.env.OBFUSCABLE_WARNING;
            const customLogger = {
                warn() { }
            };
            getClassName_1.setLogger(customLogger);
            const warnSpy = Sinon.spy(customLogger, 'warn');
            class Class {
            }
            expect(getClassName_1.getClassName(Class)).toEqual('Class');
            expect(warnSpy.called).toBe(true);
        });
        for (const falsyValue of falsyValues) {
            it('does not display the warning message if process.env.OBFUSCABLE_WARNING is falsy = ' + falsyValue, function () {
                process.env.OBFUSCABLE_WARNING = falsyValue;
                const customLogger = {
                    warn() { }
                };
                getClassName_1.setLogger(customLogger);
                const warnSpy = Sinon.spy(customLogger, 'warn');
                class Class {
                }
                expect(getClassName_1.getClassName(Class)).toEqual('Class');
                expect(warnSpy.called).toBe(false);
            });
        }
    });
});
describe('.setLogger()', function () {
    it('sets logger for displaying warning message', function () {
        const customLogger = {
            warn() { }
        };
        getClassName_1.setLogger(customLogger);
        expect(customLogger === getClassName_1.logger).toBe(true);
    });
});
