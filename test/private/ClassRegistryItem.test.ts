import 'jest'
import { bind, register, ClassRegistry } from '../../lib'

describe('ClassRegistryItem', function() {
  describe('private .createInstance()', function() {
    @register()
    class Original {
      static className = 'Original'
    }
    it('returns undefined if there is concreteClassName but concreteClass not register yet', function() {
      class Final1 {
        static className = 'Final1'
      }

      bind(Original.className, Final1.className)
      expect(ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeUndefined()
    })

    it('skips instance... values if has concreteClassName', function() {
      const classRegistryItem = ClassRegistry.findOrFail(Original.className)
      classRegistryItem.instanceCreator = function() {
        return new Date()
      }
      expect(ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeUndefined()
    })

    it('returns createInstance of ClassRegistryItem with concreteClassName', function() {
      @register()
      class Final {
        static className = 'Final'
      }

      bind(Original.className, Final.className)
      expect(ClassRegistry.findOrFail(Original.className)['createInstance']()).toBeInstanceOf(Final)
    })

    it('creates instance from instanceConstructor if it set', function() {
      @register()
      class Test {
        static className = 'Test'
      }
      expect(ClassRegistry.findOrFail('Test')['createInstance']()).toBeInstanceOf(Test)
    })

    it('creates instance from instanceConstructor with arguments if it set', function() {
      @register()
      class TestArgs {
        static className = 'TestArgs'
        value: any

        constructor(value: any) {
          this.value = value
        }
      }
      const instance: TestArgs = ClassRegistry.findOrFail('TestArgs')['createInstance']([{ arg: 'anything' }])
      expect(instance).toBeInstanceOf(TestArgs)
      expect(instance.value).toEqual({ arg: 'anything' })
    })

    it('creates instance from instanceCreator if instanceConstructor not found', function() {
      const classRegistryItem = ClassRegistry.findOrFail('Test')
      classRegistryItem.instanceConstructor = undefined
      classRegistryItem.instanceCreator = function() {
        return new Date()
      }
      expect(classRegistryItem['createInstance']()).toBeInstanceOf(Date)
    })

    it('return instance if instanceConstructor and instanceCreator not found and singleton is true', function() {
      const classRegistryItem = ClassRegistry.findOrFail('Test')
      classRegistryItem.instanceConstructor = undefined
      classRegistryItem.instanceCreator = undefined
      classRegistryItem.instance = new Date()
      classRegistryItem.singleton = true
      expect(classRegistryItem['createInstance']()).toBeInstanceOf(Date)
    })

    it('return undefined if instanceConstructor and instanceCreator not found', function() {
      const classRegistryItem = ClassRegistry.findOrFail('Test')
      classRegistryItem.instanceConstructor = undefined
      classRegistryItem.instanceCreator = undefined
      classRegistryItem.singleton = false
      expect(classRegistryItem['createInstance']()).toBeUndefined()
    })
  })

  describe('private .extendInstance()', function() {
    it('does nothing, just return instance if there is no instanceExtending', function() {
      const classRegistryItem = ClassRegistry.findOrFail('Test')
      expect(classRegistryItem['extendInstance']('test') === 'test').toBe(true)
      expect(classRegistryItem['extendInstance'](1) === 1).toBe(true)
      const instance = {}
      expect(classRegistryItem['extendInstance'](instance) === instance).toBe(true)
    })

    it('passes instance to instanceExtending() and returns result', function() {
      const classRegistryItem = ClassRegistry.findOrFail('Test')
      class WrappedClass {
        instance: any

        constructor(instance: any) {
          this.instance = instance
        }
      }
      const instance = {}
      classRegistryItem.instanceExtending = function(arg: any) {
        return new WrappedClass(arg)
      }
      expect(classRegistryItem['extendInstance'](instance) === instance).toBe(false)
      expect(classRegistryItem['extendInstance'](instance)).toBeInstanceOf(WrappedClass)
      expect(classRegistryItem['extendInstance'](instance)['instance'] === instance).toBe(true)
    })
  })
})
