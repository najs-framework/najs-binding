namespace Najs.Contracts {
  export class AutoloadContext {
    /**
     * The context object passed from a hosted class which use @autoload
     */
    protected __autoloadContext: Object
  }

  export interface Autoload extends AutoloadContext {
    /**
     * Get name of the class.
     */
    getClassName(): string
  }
}
