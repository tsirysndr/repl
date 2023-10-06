import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Nix from "./nix.ts";

class Flakehub implements Plugin {
  name = "flakehub";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      add: (args: string[]) => spawn("fh", ["add", ...args]),
      completion: (args: string[]) => spawn("fh", ["completion", ...args]),
      init: (args: string[]) => spawn("fh", ["init", ...args]),
      list: (args: string[]) => spawn("fh", ["list", ...args]),
      search: (args: string[]) => spawn("fh", ["search", ...args]),
      version: (args: string[]) => spawn("fh", ["--version", ...args]),
      help: () => {
        console.log(`    Commands:
        add         Adds a flake input to your flake.nix
        completion  Prints completion for shells to use
        init        Create a new flake.nix using an opinionated interactive initializer
        list        Lists key FlakeHub resources
        search      Searches FlakeHub for flakes that match your query
        help        Print this message or the help of the given subcommand(s)
        version     Prints version information`);
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
      "type fh > /dev/null || nix profile install github:DeterminateSystems/fh",
    ]);
  }
}

export default Flakehub;
