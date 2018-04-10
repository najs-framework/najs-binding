declare namespace Najs.Contracts {
    interface AutoloadContext {
        /**
         * The context object passed from a hosted class which use @autoload
         */
        __autoloadContext: Object;
    }
    interface Autoload {
        /**
         * Get name of the class.
         */
        getClassName(): string;
    }
}
