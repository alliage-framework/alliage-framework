import { AbstractScript } from '../core/script';
import { Arguments } from '../core/utils/cli';

export class BuildScript extends AbstractScript {
  public execute(args: Arguments, env: string) {
    return this.getKernel().build(args, env);
  }
}
