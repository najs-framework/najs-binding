import { register } from './register'
import { ClassRegistry } from './ClassRegistry'
import { ClassRegistryItem } from '../private/ClassRegistryItem'
import { get_class_name } from '../private/get_class_name'
import { isFunction } from 'lodash'

export type Decorator = (target: any) => any
export type InstanceExtending = (instance: any) => any

export function extend(className: string): Decorator
export function extend(classDefinition: Function): Decorator
export function extend(className: string, decorator: InstanceExtending): void
export function extend(classDefinition: Function, decorator: InstanceExtending): void
export function extend(abstract: Function | string, extendingFunction?: InstanceExtending): any {
  if (typeof extendingFunction === 'undefined') {
    return function(target: any): any {
      extend(<any>abstract, function(instance) {
        return Reflect.construct(target, [instance])
      })
    }
  }

  const className = get_class_name(abstract)
  if (isFunction(abstract) && !ClassRegistry.has(className)) {
    register(abstract, className)
  }
  const item: ClassRegistryItem = ClassRegistry.findOrFail(className)
  item.instanceExtending = extendingFunction
}
