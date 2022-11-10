import { RunScript } from '../run';
import { Arguments } from '../../core/utils/cli';

jest.mock('../../core/script');

describe('core/script/run', () => {
  describe('RunScript', () => {
    describe('#execute', () => {
      it("should call the 'run' method of the kernel", () => {
        const args = Arguments.create();
        const runScript = new RunScript() as any;
        runScript.execute(args, 'test');

        expect(runScript.kernel.build).not.toHaveBeenCalled();
        expect(runScript.kernel.install).not.toHaveBeenCalled();
        expect(runScript.kernel.run).toHaveBeenCalledWith(args, 'test');
      });
    });
  });
});
