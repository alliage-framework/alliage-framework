export class AbstractScript {
  public kernel = {
    build: jest.fn(),
    install: jest.fn(),
    run: jest.fn(),
  };

  public getKernel() {
    return this.kernel;
  }
}
