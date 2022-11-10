import { KernelEventHandlers } from '../kernel';

export interface IModule {
  getKernelEventHandlers(): KernelEventHandlers;
}

export interface ModuleConstructor {
  new (): IModule;
}

export abstract class AbstractModule implements IModule {
  public getKernelEventHandlers() {
    return {};
  }
}
