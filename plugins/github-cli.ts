import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class GithubCLI implements Plugin {
  name = "gh";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      pr: (args: string[]) => spawn(this.name, ["pr", ...args]),
      repo: (args: string[]) => spawn(this.name, ["repo", ...args]),
      issue: (args: string[]) => spawn(this.name, ["issue", ...args]),
      gist: (args: string[]) => spawn(this.name, ["gist", ...args]),
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      help: () => {
        console.log(`    Common GitHub CLI Commands:
        pr      Work with pull requests
        repo    Create, clone, fork, and view repositories
        issue   Create and manage issues
        gist    Create gists
        auth    Authenticate and configure GitHub CLI`);
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
    await spawn("sh", ["-c", "type gh > /dev/null || brew install gh"]);
  }
}

export default GithubCLI;
