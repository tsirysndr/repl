import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Turso implements Plugin {
  name = "turso";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      contact: (args: string[]) => spawn(this.name, ["contact", ...args]),
      db: (args: string[]) => spawn(this.name, ["db", ...args]),
      dev: (args: string[]) => spawn(this.name, ["dev", ...args]),
      group: (args: string[]) => spawn(this.name, ["group", ...args]),
      org: (args: string[]) => spawn(this.name, ["org", ...args]),
      plan: (args: string[]) => spawn(this.name, ["plan", ...args]),
      quickstart: (args: string[]) => spawn(this.name, ["quickstart", ...args]),
      relax: (args: string[]) => spawn(this.name, ["relax", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Available Commands:
        auth        Authenticate with Turso
        contact     Reach out to the makers of Turso for help or feedback
        db          Manage databases
        dev         starts a local development server for Turso
        group       Manage your database groups
        help        Help about any command
        org         Manage your organizations
        plan        Manage your organization plan
        quickstart  Turso quick quickstart.
        relax       Sometimes you feel like you're working too hard... relax!
        update      Update the CLI to the latest version
        version     Print the version number of Turso`);
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
    await spawn("sh", [
      "-c",
      "type turso > /dev/null || brew install tursodatabase/tap/turso",
    ]);
  }
}

export default Turso;
