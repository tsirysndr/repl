import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Dagger implements Plugin {
  name = "dagger";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      query: (args: string[]) => spawn(this.name, ["query", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Available Commands:
          help        Help about any command
          login       Log in to Dagger Cloud
          logout      Log out from Dagger Cloud
          query       Send API queries to a dagger engine
          run         Runs a command in a Dagger session
          version     Print dagger version`);
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

  async install(): Promise<void> {
    await spawn("sh", [
      "-c",
      "type dagger > /dev/null || (cd /usr/local && curl -L https://dl.dagger.io/dagger/install.sh | sudo sh)",
    ]);
  }
}

export default Dagger;
