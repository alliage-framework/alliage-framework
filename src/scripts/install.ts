import { AbstractScript } from '../core/script';
import { Arguments } from '../core/utils/cli';

export class InstallScript extends AbstractScript {
  public execute(args: Arguments, env: string) {
    return this.getKernel().install(args, env);
  }
}
