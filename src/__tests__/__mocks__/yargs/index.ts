import { YargsMock } from './types';

const yargsMock = jest.fn() as YargsMock;

const apiMocks = {
  parserConfiguration: jest.fn().mockReturnThis(),
  scriptName: jest.fn().mockReturnThis(),
  command: jest
    .fn()
    .mockImplementation(function command(this: any, _command, _description, callback) {
      callback(yargsMock('__MOCK_COMMAND_CALLBACK__'));
      return this;
    }),
  help: jest.fn().mockReturnThis(),
  positional: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  argv: {} as any,
};

yargsMock.mockReturnValue(apiMocks);

yargsMock.apiMocks = apiMocks;
yargsMock.setExpectedArgs = (args) => {
  apiMocks.argv = args;
};

const originalMockClear = yargsMock.mockClear;
yargsMock.mockClear = function mockClear() {
  apiMocks.argv = {};
  originalMockClear.call(this);
};

export = yargsMock;
