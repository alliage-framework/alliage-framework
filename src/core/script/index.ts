import path from 'path';

import { Kernel, ModuleMap } from '../kernel';
import { Arguments } from '../utils/cli';

const LOCAL_MODULE_PATTERN = /^\.{0,2}\//;

export interface ModulesDefinition {
  [key: string]: {
    module: string;
    deps: string[];
    envs?: string[];
  };
}

export abstract class AbstractScript {
  private kernel: Kernel;

  public constructor() {
    this.kernel = this.loadKernel();
  }

  /* eslint-disable import/no-dynamic-require, global-require */
  private loadKernel() {
    const modulesDefinition: ModulesDefinition = require(path.resolve('./alliage-modules.json'));

    const modules: ModuleMap = Object.entries(modulesDefinition).reduce((acc, [name, def]) => {
      const module = LOCAL_MODULE_PATTERN.test(def.module)
        ? require(path.resolve(def.module))
        : require(def.module);

      return {
        ...acc,
        [name]: [module.default ?? module, def.deps, def.envs ?? []],
      };
    }, {});
    return new Kernel(modules);
  }
  /* eslint-disable import/no-dynamic-require, global-require */

  protected getKernel() {
    return this.kernel;
  }

  public abstract execute(args?: Arguments, env?: string): void | Promise<void>;
}

export interface ScriptConstructor {
  new (): AbstractScript;
}
