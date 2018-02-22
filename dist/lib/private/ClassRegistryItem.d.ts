export declare type InstanceCreator = () => any;
export declare type InstanceExtending = (instance: any) => any;
export declare class ClassRegistryItem {
    className: string;
    overridable: boolean;
    singleton: boolean;
    concreteClassName?: string | undefined;
    instanceConstructor?: {
        new (): any;
    };
    instanceCreator?: InstanceCreator;
    instanceExtending?: InstanceExtending;
    instance?: any;
    constructor(className: string, instanceConstructor?: {
        new (): any;
    }, instanceCreator?: InstanceCreator, instance?: any, overridable?: boolean, singleton?: boolean);
    private createInstance(args?);
    private extendInstance(instance);
    make<T>(): T;
    make<T>(data: Object): T;
    make<T>(args: any[]): T;
}
