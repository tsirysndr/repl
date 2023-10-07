import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Neon implements Plugin {
  name = "neonctl";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      auth: (args: string[]) => spawn("bunx", [this.name, "auth", ...args]),
      me: (args: string[]) => spawn("bunx", [this.name, "me", ...args]),
      projects: (args: string[]) =>
        spawn("bunx", [this.name, "projects", ...args]),
      branches: (args: string[]) =>
        spawn("bunx", [this.name, "branches", ...args]),
      databases: (args: string[]) =>
        spawn("bunx", [this.name, "databases", ...args]),
      roles: (args: string[]) => spawn("bunx", [this.name, "roles", ...args]),
      operations: (args: string[]) =>
        spawn("bunx", [this.name, "operations", ...args]),
      "connection-string": (args: string[]) =>
        spawn("bunx", [this.name, "connection-string", ...args]),
      completion: (args: string[]) =>
        spawn("bunx", [this.name, "completion", ...args]),
      version: (args: string[]) =>
        spawn("bunx", [this.name, "--version", ...args]),
      help: () => {
        console.log(`
        Commands:
        neonctl auth
        └────────────────>  Authenticate
        neonctl me
        └────────────────>  Show current user
        neonctl projects
        └────────────────>  Manage projects
        neonctl branches
        └────────────────>  Manage branches
        neonctl databases
        └────────────────>  Manage databases
        neonctl roles
        └────────────────>  Manage roles
        neonctl operations
        └────────────────>  Manage operations
        neonctl connection-string [branch]
        └────────────────>  Get connection string
        neonctl completion
        └────────────────>  generate completion script
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
    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type node > /dev/null || brew install node"]);
    await spawn("sh", ["-c", "type bun > /dev/null || brew install bun"]);
  }
}

export default Neon;
