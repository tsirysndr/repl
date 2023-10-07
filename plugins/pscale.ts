import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Pscale implements Plugin {
  name = "pscale";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      api: (args: string[]) => spawn(this.name, ["api", ...args]),
      "audit-log": (args: string[]) => spawn(this.name, ["audit-log", ...args]),
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      backup: (args: string[]) => spawn(this.name, ["backup", ...args]),
      branch: (args: string[]) => spawn(this.name, ["branch", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      connect: (args: string[]) => spawn(this.name, ["connect", ...args]),
      "data-imports": (args: string[]) =>
        spawn(this.name, ["data-imports", ...args]),
      database: (args: string[]) => spawn(this.name, ["database", ...args]),
      "deploy-request": (args: string[]) =>
        spawn(this.name, ["deploy-request", ...args]),
      org: (args: string[]) => spawn(this.name, ["org", ...args]),
      password: (args: string[]) => spawn(this.name, ["password", ...args]),
      region: (args: string[]) => spawn(this.name, ["region", ...args]),
      "service-token": (args: string[]) =>
        spawn(this.name, ["service-token", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      signup: (args: string[]) => spawn(this.name, ["signup", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Available Commands:
        api            Performs authenticated calls against the PlanetScale API. Useful for scripting.
        audit-log      List audit logs
        auth           Login and logout via the PlanetScale API
        backup         Create, list, show, and delete branch backups
        branch         Create, delete, diff, and manage branches
        completion     Generate completion script for your shell
        connect        Create a secure connection to a database and branch for a local client
        data-imports   Create, list, and delete branch data imports
        database       Create, read, delete, and dump/restore databases
        deploy-request Create, review, diff, revert, and manage deploy requests
        help           Help about any command
        org            List, show, and switch organizations
        password       Create, list, and delete branch passwords
        region         List regions
        service-token  Create, list, and manage access for service tokens
        shell          Open a MySQL shell instance to a database and branch
        signup         Signup for a new PlanetScale account
        version        Print the version number of pscale`);
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
      "type pscale > /dev/null || brew install planetscale/tap/pscale",
    ]);
  }
}

export default Pscale;
