import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Brew implements Plugin {
  name = "brew";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      uninstall: (args: string[]) => spawn(this.name, ["uninstall", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      doctor: (args: string[]) => spawn(this.name, ["doctor", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      help: () => {
        console.log(`
        Example usage:
            brew search TEXT|/REGEX/
            brew info [FORMULA|CASK...]
            brew install FORMULA|CASK...
            brew update
            brew upgrade [FORMULA|CASK...]
            brew uninstall FORMULA|CASK...
            brew list [FORMULA|CASK...]

        Troubleshooting:
            brew config
            brew doctor
            brew install --verbose --debug FORMULA|CASK

        Contributing:
            brew create URL [--no-fetch]
            brew edit [FORMULA|CASK...]

        Further help:
            brew commands
            brew help [COMMAND]
        `);
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
    console.log("Command not found");
  }
}

export default Brew;
