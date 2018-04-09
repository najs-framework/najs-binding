declare namespace Najs.Contracts {
    class AutoloadContext {
        /**
         * The context object passed from a hosted class which use @autoload
         */
        protected __autoloadContext: Object;
    }
    interface Autoload extends AutoloadContext {
        /**
         * Get name of the class.
         */
        getClassName(): string;
    }
}
