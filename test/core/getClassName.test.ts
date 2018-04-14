import 'jest'
import * as Sinon from 'sinon'
import { logger, getClassName, setLogger } from '../../lib/core/getClassName'
declare const process: any

describe('.getClassName()', function() {
  it('returns classDefinition if it is a string and allowString = true', function() {
    expect(getClassName('Test', true)).toEqual('Test')
  })

  it('returns .getClassName() if it exists', function() {
    class Test {
      static className = 'className'

      getClassName() {
        return 'GetClassName'
      }
    }
    expect(getClassName(Test)).toEqual('GetClassName')
  })

  it('returns Function.className if it exists and .getClassName() not exists', function() {
    class Test {
      static className = 'className'
    }
    expect(getClassName(Test)).toEqual('className')
  })

  it('can get className from the instance', function() {
    class ClassDefinition {
      static className = 'ClassDefinition'
    }
    expect(getClassName(new ClassDefinition())).toEqual('ClassDefinition')
  })

  it('throw an TypeError if could not resolve Definition from instance', function() {
    try {
      getClassName({})
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error.message).toEqual('Can not find the constructor of [object Object]')
      return
    }
    expect('should not reach here').toEqual('hum')
  })

  describe('class which has no .getClassName() and static className', function() {
    it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy', function() {
      delete process.env.OBFUSCABLE_CHECK
      const customLogger = {
        warn() {}
      }
      setLogger(customLogger)

      class Class {}
      expect(getClassName(Class)).toEqual('Class')
    })

    const falsyValues = ['', '0', 'false', 'no']
    for (const falsyValue of falsyValues) {
      it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy = ' + falsyValue, function() {
        process.env.OBFUSCABLE_CHECK = falsyValue
        const customLogger = {
          warn() {}
        }
        setLogger(customLogger)

        class Class {}
        expect(getClassName(Class)).toEqual('Class')
      })
    }

    it('throws an TypeError if process.env.OBFUSCABLE_CHECK is set', function() {
      process.env.OBFUSCABLE_CHECK = true
      try {
        class Class {}
        expect(getClassName(Class)).toEqual('Class')
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
        expect(error.message.indexOf('Please define "className" or "getClassName" for') === 0).toBe(true)
        delete process.env.OBFUSCABLE_CHECK
        return
      }
      expect('should not reach this line').toEqual('hmm')
    })

    it('displays the warning message if process.env.OBFUSCABLE_WARNING is not found', function() {
      delete process.env.OBFUSCABLE_WARNING
      const customLogger = {
        warn() {}
      }
      setLogger(customLogger)
      const warnSpy = Sinon.spy(customLogger, 'warn')

      class Class {}
      expect(getClassName(Class)).toEqual('Class')
      expect(warnSpy.called).toBe(true)
    })

    for (const falsyValue of falsyValues) {
      it('does not display the warning message if process.env.OBFUSCABLE_WARNING is falsy = ' + falsyValue, function() {
        process.env.OBFUSCABLE_WARNING = falsyValue
        const customLogger = {
          warn() {}
        }
        setLogger(customLogger)
        const warnSpy = Sinon.spy(customLogger, 'warn')

        class Class {}
        expect(getClassName(Class)).toEqual('Class')
        expect(warnSpy.called).toBe(false)
      })
    }
  })
})

describe('.setLogger()', function() {
  it('sets logger for displaying warning message', function() {
    const customLogger = {
      warn() {}
    }

    setLogger(customLogger)
    expect(customLogger === logger).toBe(true)
  })
})
