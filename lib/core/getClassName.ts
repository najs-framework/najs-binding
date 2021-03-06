import { isString, isFunction } from 'lodash'
declare const process: any
declare const console: any

export let logger: {
  warn(...log: string[]): void
} = console

export function getClassName(input: any, allowString: boolean = true): string {
  if (allowString && isString(input)) {
    return input
  }

  if (typeof input === 'object') {
    const prototype = Object.getPrototypeOf(input)
    if (prototype !== Object.prototype) {
      return getClassName(prototype.constructor)
    }
    throw new TypeError('Can not find the constructor of ' + input)
  }

  return findClassNameByDefinition(input)
}

function findClassNameByDefinition(classDefinition: Function) {
  if (isFunction(classDefinition.prototype.getClassName)) {
    return classDefinition.prototype.getClassName.call(classDefinition)
  }

  if (isString(classDefinition['className'])) {
    return classDefinition['className']
  }

  if (isFalsy(process.env.OBFUSCABLE_CHECK)) {
    if (typeof process.env.OBFUSCABLE_WARNING === 'undefined' || !isFalsy(process.env.OBFUSCABLE_WARNING)) {
      logger.warn('Class', '"' + classDefinition.name + '"', 'may not be used if you uglify (obfuscate) your script.')
    }
    return classDefinition.name
  }

  throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition)
}

function isFalsy(value: string | undefined) {
  if (typeof value === 'undefined') {
    return true
  }
  switch (value.toLowerCase().trim()) {
    case '':
    case '0':
    case 'false':
    case 'no':
      return true
  }
  return false
}

export function setLogger(log: { warn(...log: string[]): void }) {
  logger = log
}
