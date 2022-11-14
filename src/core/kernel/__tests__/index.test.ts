import {
  PrimitiveContainer,
  Arguments,
  INITIALIZATION_CONTEXT,
  CircularReferenceError,
  UnknownModuleError,
  AbstractModule,
} from '../../..';

import { Kernel, ModuleMap } from '..';

describe('core/kernel', () => {
  describe('Kernel', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const firstModuleEvents = {
      init: jest.fn(),
      install: jest.fn(),
      build: jest.fn(),
    };

    const secondModuleEvents = {
      init: jest.fn(),
      install: jest.fn(),
      run: jest.fn(),
    };

    const thirdModuleEvents = {
      init: jest.fn(),
      build: jest.fn(),
      run: jest.fn(),
    };

    const modules: ModuleMap = {
      thirdModule: [
        class ThirdModule extends AbstractModule {
          getKernelEventHandlers() {
            return thirdModuleEvents;
          }
        },
        ['secondModule'],
        [],
      ],
      secondModule: [
        class SecondModule extends AbstractModule {
          getKernelEventHandlers() {
            return secondModuleEvents;
          }
        },
        ['firstModule'],
        [],
      ],
      firstModule: [
        class FirstModule extends AbstractModule {
          getKernelEventHandlers() {
            return firstModuleEvents;
          }
        },
        [],
        [],
      ],
    };

    describe('#install', () => {
      it('should call the init and install event handlers in the right order', async () => {
        const kernel = new Kernel(modules);
        const args = Arguments.create();
        await kernel.install(args, 'test');

        // Checks that only needed init events handlers have been called only once
        expect(firstModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(secondModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(thirdModuleEvents.init).toHaveBeenCalledTimes(1);

        // Check that init events handlers have been called with the right arguments
        expect(firstModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.INSTALL,
        );
        expect(secondModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.INSTALL,
        );
        expect(thirdModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.INSTALL,
        );

        // Check that init event handlers have been called in the right order
        expect(firstModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          secondModuleEvents.init.mock.invocationCallOrder[0],
        );
        expect(secondModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          thirdModuleEvents.init.mock.invocationCallOrder[0],
        );

        // Checks that install events handlers have been called once
        expect(firstModuleEvents.install).toHaveBeenCalledTimes(1);
        expect(secondModuleEvents.install).toHaveBeenCalledTimes(1);

        // Check that install events handlers have been called with the right arguments
        expect(firstModuleEvents.install).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );
        expect(secondModuleEvents.install).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );

        // Checks that install events handlers have been called in the right order
        expect(firstModuleEvents.install.mock.invocationCallOrder[0]).toBeLessThan(
          secondModuleEvents.install.mock.invocationCallOrder[0],
        );
      });
    });

    describe('#build', () => {
      it('should call the init and build event handlers in the right order', async () => {
        const kernel = new Kernel(modules);
        const args = Arguments.create();
        await kernel.build(args, 'test');

        // Check that init events handlers have been called only once
        expect(firstModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(secondModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(thirdModuleEvents.init).toHaveBeenCalledTimes(1);

        // Check that init events handlers have been called with the right arguments
        expect(firstModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.BUILD,
        );
        expect(secondModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.BUILD,
        );
        expect(thirdModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.BUILD,
        );

        // Checks that init events handlers have been called in the right order
        expect(firstModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          secondModuleEvents.init.mock.invocationCallOrder[0],
        );
        expect(secondModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          thirdModuleEvents.init.mock.invocationCallOrder[0],
        );

        // Checks that build events handlers have been called once
        expect(firstModuleEvents.build).toHaveBeenCalledTimes(1);
        expect(thirdModuleEvents.build).toHaveBeenCalledTimes(1);

        // Check that build events handlers have been called with the right arguments
        expect(firstModuleEvents.build).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );
        expect(thirdModuleEvents.build).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );

        // Checks that build events handlers have been called in the right order
        expect(firstModuleEvents.build.mock.invocationCallOrder[0]).toBeLessThan(
          thirdModuleEvents.build.mock.invocationCallOrder[0],
        );
      });
    });

    describe('#run', () => {
      it('should call the init and build event handlers in the right order', async () => {
        const kernel = new Kernel(modules);
        const args = Arguments.create();
        await kernel.run(args, 'test');

        // Checks that init events handlers have been called only once
        expect(firstModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(secondModuleEvents.init).toHaveBeenCalledTimes(1);
        expect(thirdModuleEvents.init).toHaveBeenCalledTimes(1);

        // Check that init events handlers have been called with the right arguments
        expect(firstModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.RUN,
        );
        expect(secondModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.RUN,
        );
        expect(thirdModuleEvents.init).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          INITIALIZATION_CONTEXT.RUN,
        );

        // Checks that init events handlers have been called in the right order
        expect(firstModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          secondModuleEvents.init.mock.invocationCallOrder[0],
        );
        expect(secondModuleEvents.init.mock.invocationCallOrder[0]).toBeLessThan(
          thirdModuleEvents.init.mock.invocationCallOrder[0],
        );

        // Checks that run events handlers have been called only once
        expect(secondModuleEvents.run).toHaveBeenCalledTimes(1);
        expect(thirdModuleEvents.run).toHaveBeenCalledTimes(1);

        // Check that run events handlers have been called with the right arguments
        expect(secondModuleEvents.run).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );
        expect(thirdModuleEvents.run).toHaveBeenCalledWith(
          args,
          'test',
          expect.any(PrimitiveContainer),
          undefined,
        );

        // Checks that run events handlers have been called in the right order
        expect(secondModuleEvents.run.mock.invocationCallOrder[0]).toBeLessThan(
          thirdModuleEvents.run.mock.invocationCallOrder[0],
        );
      });
    });

    it('should only load modules whose envs list is empty or contains the current execution env', async () => {
      const modulesWithEnvs: ModuleMap = {
        firstModule: [
          class FirstModule extends AbstractModule {
            getKernelEventHandlers() {
              return firstModuleEvents;
            }
          },
          [],
          [],
        ],
        secondModule: [
          class SecondModule extends AbstractModule {
            getKernelEventHandlers() {
              return secondModuleEvents;
            }
          },
          [],
          ['test'],
        ],
        thirdModule: [
          class ThirdModule extends AbstractModule {
            getKernelEventHandlers() {
              return thirdModuleEvents;
            }
          },
          [],
          ['production', 'dev'],
        ],
      };

      const kernel = new Kernel(modulesWithEnvs);
      const args = Arguments.create();

      await kernel.run(args, 'test');

      expect(firstModuleEvents.init).toHaveBeenCalledTimes(1);
      expect(secondModuleEvents.init).toHaveBeenCalledTimes(1);
      expect(thirdModuleEvents.init).not.toHaveBeenCalled();

      expect(secondModuleEvents.run).toHaveBeenCalledTimes(1);
      expect(thirdModuleEvents.run).not.toHaveBeenCalled();
    });

    it('should throw error in case of circular reference', async () => {
      const modulesWithCircularReference: ModuleMap = {
        firstModule: [class FirstModule extends AbstractModule {}, ['secondModule'], []],
        secondModule: [class SecondModule extends AbstractModule {}, ['firstModule'], []],
      };

      const kernel = new Kernel(modulesWithCircularReference);
      const args = Arguments.create();

      let error: Error | null = null;
      try {
        await kernel.install(args, 'test');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(CircularReferenceError);

      error = null;
      try {
        await kernel.build(args, 'test');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(CircularReferenceError);

      error = null;
      try {
        await kernel.run(args, 'test');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(CircularReferenceError);
    });

    it('should throw an error in case of unregistered module', async () => {
      const modulesWithMissingDep: ModuleMap = {
        firstModule: [
          class FirstModule extends AbstractModule {
            getKernelEventHandlers() {
              return firstModuleEvents;
            }
          },
          ['unknown-module'],
          [],
        ],
      };

      const kernel = new Kernel(modulesWithMissingDep);
      const args = Arguments.create();

      let error;
      try {
        await kernel.run(args, 'test');
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(UnknownModuleError);
      expect(error.message).toEqual(
        'Unknown module "unknown-module".\nThis usually happens when a module relies on a dependency that has not been registered yet.\nPlease check your "alliage-modules.json" file',
      );
    });
  });
});
