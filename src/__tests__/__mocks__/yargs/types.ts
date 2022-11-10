export interface YargsMock extends jest.Mock {
  apiMocks: {
    parserConfiguration: jest.Mock;
    scriptName: jest.Mock;
    command: jest.Mock;
    help: jest.Mock;
    positional: jest.Mock;
    option: jest.Mock;
    argv: any;
  };
  setExpectedArgs: (args: any) => void;
}
