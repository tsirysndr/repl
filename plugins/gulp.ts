import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import { blue } from "../deps.ts";
import Brew from "./brew.ts";

class Gulp implements Plugin {
  name = "gulp";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      run: (args: string[]) => spawn("bunx", ["gulp-cli", ...args]),
      tasks: (args: string[]) =>
        spawn("bunx", ["gulp-cli", "--tasks", ...args]),
      verify: (args: string[]) =>
        spawn("bunx", ["gulp-cli", "--verify", ...args]),
      version: (args: string[]) =>
        spawn("bunx", ["gulp-cli", "--version", ...args]),
      help: () => {
        console.log(`    Usage:
        tasks [options]
        
        Commands:
          tasks [options] ${blue("List the tasks available to run.")}
          verify          ${blue(
            "Will verify plugins referenced in project's\n\
                          package.json against the plugins blacklist."
          )}
          version         ${blue("Print the version number of bun.")}`);
        return Promise.resolve();
      },
    };
  }

  async evaluate(command: string): Promise<void> {
    const [cmd, ...params] = command.split(" ");
    if (this.commands[cmd]) {
      await this.commands[cmd]([...params]);
      return;
    }
    if (cmd === "") {
      return;
    }
    await this.commands["run"]([...params, cmd]);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type node > /dev/null || brew install node"]);
    await spawn("sh", ["-c", "type bun > /dev/null || brew install bun"]);
  }
}

export default Gulp;
