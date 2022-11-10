import { BuildScript } from '../build';
import { Arguments } from '../../core/utils/cli';

jest.mock('../../core/script');

describe('core/script/build', () => {
  describe('BuildScript', () => {
    describe('#execute', () => {
      it("should call the 'build' method of the kernel", () => {
        const args = Arguments.create();
        const buildScript = new BuildScript() as any;
        buildScript.execute(args, 'test');

        expect(buildScript.kernel.build).toHaveBeenCalledWith(args, 'test');
        expect(buildScript.kernel.install).not.toHaveBeenCalled();
        expect(buildScript.kernel.run).not.toHaveBeenCalled();
      });
    });
  });
});
