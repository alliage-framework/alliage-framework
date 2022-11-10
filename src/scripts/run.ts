import { AbstractScript } from '../core/script';
import { Arguments } from '../core/utils/cli';

export class RunScript extends AbstractScript {
  public execute(args: Arguments, env: string) {
    return this.getKernel().run(args, env);
  }
}
