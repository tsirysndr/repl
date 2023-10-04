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
            search TEXT|/REGEX/
            info [FORMULA|CASK...]
            install FORMULA|CASK...
            update
            upgrade [FORMULA|CASK...]
            uninstall FORMULA|CASK...
            list [FORMULA|CASK...]

        Troubleshooting:
            config
            doctor
            install --verbose --debug FORMULA|CASK

        Contributing:
            create URL [--no-fetch]
            edit [FORMULA|CASK...]

        Further help:
            commands
            help [COMMAND]
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

  async install() {
    await spawn("sh", [
      "-c",
      'type brew || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
    ]);
    Deno.env.set(
      "PATH",
      `${Deno.env.get("PATH")}:/home/linuxbrew/.linuxbrew/bin`
    );
    Deno.env.set(
      "PATH",
      `${Deno.env.get("PATH")}:/home/linuxbrew/.linuxbrew/sbin`
    );
  }
}

export default Brew;
