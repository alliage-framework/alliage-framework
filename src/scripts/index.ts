#!/usr/bin/env node

import { BuildScript } from './build';
import { RunScript } from './run';
import { ScriptConstructor } from '../core/script/index';
import { InstallScript } from './install';
import { ArgumentsParser, CommandBuilder, Arguments } from '../core/utils/cli';

const scripts: { [name: string]: ScriptConstructor } = {
  install: InstallScript,
  build: BuildScript,
  run: RunScript,
};

export async function execute() {
  const args = ArgumentsParser.parse(
    CommandBuilder.create()
      .setDescription('Runs a script')
      .addArgument('script', {
        describe: 'The script to run',
        type: 'string',
        choices: Object.keys(scripts),
      })
      .addOption('env', {
        describe: 'The execution environment',
        type: 'string',
        default: 'production',
      }),
    Arguments.create({}, process.argv.slice(2)),
  );

  const scriptName = args.get('script');
  if (scriptName) {
    const script = new scripts[scriptName]({ is_main_script: true });
    await script.execute(args, args.get('env'));
  }
}

export { BuildScript } from './build';
export { RunScript } from './run';
export { InstallScript } from './install';

/* istanbul ignore if */
if (!module.parent) {
  execute();
}
