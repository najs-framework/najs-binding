namespace Najs.Contracts {
  export interface AutoloadContext {
    /**
     * The context object passed from a hosted class which use @autoload
     */
    __autoloadContext: Object
  }

  export interface Autoload {
    /**
     * Get name of the class.
     */
    getClassName(): string
  }
}
