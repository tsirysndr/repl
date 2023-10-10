import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Deno from "./deno.ts";

class Fluentci implements Plugin {
  name = "fluentci";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      aws: (args: string[]) => spawn(this.name, ["aws", ...args]),
      azure: (args: string[]) => spawn(this.name, ["azure", ...args]),
      circleci: (args: string[]) => spawn(this.name, ["circleci", ...args]),
      docs: (args: string[]) => spawn(this.name, ["docs", ...args]),
      github: (args: string[]) => spawn(this.name, ["github", ...args]),
      gitlab: (args: string[]) => spawn(this.name, ["gitlab", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      help: () => {
        console.log(`    Commands:
        aws         Generate AWS Codepipeline buildspec.yml file for your project
        azure       Generate Azure Pipelines azure-pipelines.yml file for your project
        circleci    Generate CircleCI .circle/config.yml file for your project
        docs        Show the Pipeline documentation in the terminal
        github      Generate a Github Actions workflow file for your project
        gitlab      Generate Gitlab CI .gitlab-ci.yml file for your project
        init        Initialize a new pipeline in the current directory
        list        List all available jobs in a pipeline
        run         Run pipeline using Dagger and pre-built pipelines from the Fluent CI, a collection of pre-built pipelines for common CI/CD workflows written in TypeScript
        search      Search for pre-built pipelines in the Fluent CI registry
        upgrade     Upgrade the Fluent CI CLI to the latest version
        help        Print this message or the help of the given subcommand(s)`);
        return Promise.resolve();
      },
    };
  }

  async evaluate(command: string): Promise<void> {
    const [cmd, ...params] = command.split(" ");
    if (this.commands[cmd]) {
      await this.commands[cmd](params);
      return;
    }
    if (cmd === "") {
      return;
    }
    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    await new Deno().install();
    await spawn("sh", [
      "-c",
      "type fluentci > /dev/null || deno install -A -r https://cli.fluentci.io -n fluentci",
    ]);
  }
}

export default Fluentci;
