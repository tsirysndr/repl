import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Nix from "./nix.ts";

class Devbox implements Plugin {
  name = "devbox";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      generate: (args: string[]) => spawn(this.name, ["generate", ...args]),
      global: (args: string[]) => spawn(this.name, ["global", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      rm: (args: string[]) => spawn(this.name, ["rm", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      services: (args: string[]) => spawn(this.name, ["services", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      shellenv: (args: string[]) => spawn(this.name, ["shellenv", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Available Commands:
        add         Add a new package to your devbox
        auth        Devbox auth commands
        create      Initialize a directory as a devbox project using a template
        generate    Generate supporting files for your project
        global      Manage global devbox packages
        help        Help about any command
        info        Display package info
        init        Initialize a directory as a devbox project
        install     Install all packages mentioned in devbox.json
        rm          Remove a package from your devbox
        run         Run a script or command in a shell with access to your packages
        search      Search for nix packages
        services    Interact with devbox services
        shell       Start a new shell with access to your packages
        shellenv    Print shell commands that add Devbox packages to your PATH
        update      Update packages in your devbox
        version     Print version information`);
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
    await new Nix().install();
    await spawn("sh", [
      "-c",
      "type devbox > /dev/null || curl -fsSL https://get.jetpack.io/devbox | bash",
    ]);
  }
}

export default Devbox;
