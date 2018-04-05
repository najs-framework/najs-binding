import { isString, isFunction } from 'lodash'
declare const process: any

export function getClassName(classDefinition: any, allowString: boolean = true): string {
  if (allowString && isString(classDefinition)) {
    return classDefinition
  }

  if (isFunction(classDefinition.prototype.getClassName)) {
    return classDefinition.prototype.getClassName.call(classDefinition)
  }

  if (isString(classDefinition.className)) {
    return classDefinition.className
  }

  if (!process.env.OBFUSCABLE_CHECK) {
    return classDefinition.name
  }

  throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition)
}
