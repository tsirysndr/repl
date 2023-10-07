import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Turbo implements Plugin {
  name = "turbo";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      bin: (args: string[]) => spawn("bunx", ["bin", ...args]),
      completion: (args: string[]) => spawn("bunx", ["completion", ...args]),
      daemon: (args: string[]) => spawn("bunx", ["daemon", ...args]),
      generate: (args: string[]) => spawn("bunx", ["generate", ...args]),
      link: (args: string[]) => spawn("bunx", ["link", ...args]),
      login: (args: string[]) => spawn("bunx", ["login", ...args]),
      logout: (args: string[]) => spawn("bunx", ["logout", ...args]),
      prune: (args: string[]) => spawn("bunx", ["prune", ...args]),
      run: (args: string[]) => spawn("bunx", ["run", ...args]),
      unlink: (args: string[]) => spawn("bunx", ["unlink", ...args]),
      version: (args: string[]) =>
        spawn("bunx", ["turbo", "--version", ...args]),
      help: () => {
        console.log(`
        Commands:
          bin         Get the path to the Turbo binary
          completion  Generate the autocompletion script for the specified shell
          daemon      Runs the Turborepo background daemon
          generate    Generate a new app / package
          link        Link your local directory to a Vercel organization and enable remote caching
          login       Login to your Vercel account
          logout      Logout to your Vercel account
          prune       Prepare a subset of your monorepo
          run         Run tasks across projects in your monorepo
          unlink      Unlink the current directory from your Vercel organization and disable Remote Caching
          version     Print the version number of Turbo`);
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

export default Turbo;
