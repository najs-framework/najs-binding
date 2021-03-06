/**
 * `make` a class instance
 *
 * @param {class|function} classDefinition - class definition
 */
export declare function make<T>(classDefinition: any): T;
/**
 * `make` a class instance from registered class's name
 *
 * @param {string} className - the registered class name
 */
export declare function make<T>(className: string): T;
/**
 * `make` a class instance with data
 *
 * @param {class|function} classDefinition - class definition
 * @param {Object} data - filled data to instance
 */
export declare function make<T>(classDefinition: any, data: Object): T;
/**
 * `make` a class instance from registered class's name with data
 *
 * @param {string} className - the registered class name
 * @param {Object} data - filled data to instance
 */
export declare function make<T>(className: string, data: Object): T;
/**
 * `make` a class instance from class definition with args for constructor
 *
 * @param {class|function} classDefinition - class definition
 * @param {Array} data - arguments list for constructor
 */
export declare function make(classDefinition: any, args: any[]): any;
/**
 * `make` a class instance from registered class's name with args for constructor
 *
 * @param {string} className - the registered class name
 * @param {Array} data - arguments list for constructor
 */
export declare function make<T>(className: any, args: any[]): T;
