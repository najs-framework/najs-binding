import 'jest'
import { ClassRegistry } from '../../lib/core/ClassRegistry'
import { register } from '../../lib/core/register'
import { make } from '../../lib/core/make'
import { extend } from '../../lib/core/extend'

describe('extend()', function() {
  describe('@extend(className: string)', function() {
    it('should return decorator if 2nd param is missing', function() {
      expect(typeof extend('Test1') === 'function').toBe(true)
    })

    it('calls decorated class constructor by instance of Class passed in arg1 when it is created', function() {
      class Test1 {
        static className = 'Test1'
      }
      register(Test1)
      class Test2 {
        static className = 'Test2'
      }
      register(Test2)

      @extend('Test1')
      class Test1Wrapper {
        static className = 'Test1Wrapper'
        instance: Test1

        constructor(instance: Test1) {
          this.instance = instance
        }
      }

      @extend(Test2)
      class Test2Wrapper {
        static className = 'Test2Wrapper'
        instance: Test2

        constructor(instance: Test2) {
          this.instance = instance
        }
      }

      expect(ClassRegistry.has('Test1')).toBe(true)
      expect(ClassRegistry.has('Test1Wrapper')).toBe(false)
      expect(typeof ClassRegistry.findOrFail('Test1').instanceExtending === 'function').toBe(true)
      expect(make('Test1')).toBeInstanceOf(Test1Wrapper)
      expect(make('Test1')['instance']).toBeInstanceOf(Test1)
      expect(make(Test2)).toBeInstanceOf(Test2Wrapper)
      expect(make(Test2)['instance']).toBeInstanceOf(Test2)
    })
  })

  describe('@extend(className: string, decorator)', function() {
    it('assigns instanceExtending to ClassRegistryItem of className', function() {
      class Test3 {
        static className = 'Test3'
      }
      register(Test3, Test3.className)
      expect(ClassRegistry.findOrFail('Test3').instanceExtending).toBeUndefined()

      const extending = (instance: any) => {
        instance
      }
      extend(Test3, extending)
      expect(ClassRegistry.findOrFail('Test3').instanceExtending === extending).toBe(true)
    })

    it('can auto register if the extends the first parameter is classDefinition', function() {
      class Test4 {
        static className = 'Test4'
      }
      expect(ClassRegistry.has('Test4')).toBe(false)
      const extending = (instance: any) => {
        instance
      }
      extend(Test4, extending)
      expect(ClassRegistry.findOrFail('Test4').instanceExtending === extending).toBe(true)
    })

    it('should work', function() {
      class Test5 {
        static className = 'Test5'
      }
      class Test5Wrapper {
        static className = 'Test2Wrapper'
        instance: Test5

        constructor(instance: Test5) {
          this.instance = instance
        }
      }
      const extending = (instance: any) => {
        return new Test5Wrapper(instance)
      }

      extend(Test5, extending)
      expect(make(Test5)).toBeInstanceOf(Test5Wrapper)
      expect(make(Test5)['instance']).toBeInstanceOf(Test5)
      expect(make(Test5)).toBeInstanceOf(Test5Wrapper)
      expect(make(Test5)['instance']).toBeInstanceOf(Test5)
    })
  })
})
