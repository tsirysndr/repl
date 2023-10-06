import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Helm implements Plugin {
  name = "helm";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      dependency: (args: string[]) => spawn(this.name, ["dependency", ...args]),
      env: (args: string[]) => spawn(this.name, ["env", ...args]),
      get: (args: string[]) => spawn(this.name, ["get", ...args]),
      history: (args: string[]) => spawn(this.name, ["history", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      lint: (args: string[]) => spawn(this.name, ["lint", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      package: (args: string[]) => spawn(this.name, ["package", ...args]),
      plugin: (args: string[]) => spawn(this.name, ["plugin", ...args]),
      pull: (args: string[]) => spawn(this.name, ["pull", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      registry: (args: string[]) => spawn(this.name, ["registry", ...args]),
      repo: (args: string[]) => spawn(this.name, ["repo", ...args]),
      rollback: (args: string[]) => spawn(this.name, ["rollback", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      show: (args: string[]) => spawn(this.name, ["show", ...args]),
      status: (args: string[]) => spawn(this.name, ["status", ...args]),
      template: (args: string[]) => spawn(this.name, ["template", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      uninstall: (args: string[]) => spawn(this.name, ["uninstall", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      verify: (args: string[]) => spawn(this.name, ["verify", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Available Commands:
        create      create a new chart with the given name
        dependency  manage a chart's dependencies
        env         helm client environment information
        get         download extended information of a named release
        help        Help about any command
        history     fetch release history
        install     install a chart
        lint        examine a chart for possible issues
        list        list releases
        package     package a chart directory into a chart archive
        plugin      install, list, or uninstall Helm plugins
        pull        download a chart from a repository and (optionally) unpack it in local directory
        push        push a chart to remote
        registry    login to or logout from a registry
        repo        add, list, remove, update, and index chart repositories
        rollback    roll back a release to a previous revision
        search      search for a keyword in charts
        show        show information of a chart
        status      display the status of the named release
        template    locally render templates
        test        run tests for a release
        uninstall   uninstall a release
        upgrade     upgrade a release
        verify      verify that a chart at the given path has been signed and is valid
        version     print the client version information`);
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
    await new Brew().install();
    await spawn("sh", ["-c", "type helm > /dev/null || brew install helm"]);
  }
}

export default Helm;
