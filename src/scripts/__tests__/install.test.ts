import { InstallScript } from '../install';
import { Arguments } from '../../core/utils/cli';

jest.mock('../../core/script');

const commandBuilderMock = {
  setDescription: jest.fn().mockReturnThis(),
  addArgument: jest.fn().mockReturnThis(),
};
const commandBuilderCreateMock = jest.fn().mockReturnValue(commandBuilderMock);
const argumentsParserMock = jest.fn();

jest.mock('../../core/utils/cli', () => {
  return {
    ...jest.requireActual('../../core/utils/cli'),
    CommandBuilder: {
      create: () => commandBuilderCreateMock(),
    },
    ArgumentsParser: {
      parse: (...args: any[]) => argumentsParserMock(...args),
    },
  };
});

describe('core/script/run', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('InstallScript', () => {
    describe('#execute', () => {
      it("should call the 'install' method of the kernel", () => {
        const args = Arguments.create();
        const buildScript = new InstallScript({ initial_value: 'test' }) as any;
        buildScript.execute(args, 'test');

        expect(buildScript.kernel.build).not.toHaveBeenCalled();
        expect(buildScript.kernel.install).toHaveBeenCalledWith(args, 'test');
        expect(buildScript.kernel.run).not.toHaveBeenCalled();
      });
    });
  });
});
