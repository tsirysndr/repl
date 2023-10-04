import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Git implements Plugin {
  name = "git";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      clone: (args: string[]) => spawn(this.name, ["clone", ...args]),
      pull: (args: string[]) => spawn(this.name, ["pull", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      commit: (args: string[]) => spawn(this.name, ["commit", ...args]),
      status: (args: string[]) => spawn(this.name, ["status", ...args]),
      branch: (args: string[]) => spawn(this.name, ["branch", ...args]),
      log: (args: string[]) => spawn(this.name, ["log", ...args]),
      merge: (args: string[]) => spawn(this.name, ["merge", ...args]),
      tag: (args: string[]) => spawn(this.name, ["tag", ...args]),
      help: () => {
        console.log(`    Git Commands:
        clone       Clone a repository into a new directory
        pull        Fetch from and integrate with another repository or a local branch
        push        Update remote refs along with associated objects
        commit      Record changes to the repository
        status      Show the working tree status
        branch      List, create, or delete branches
        log         Show the commit logs
        merge       Join two or more development histories together
        tag         Create, list, delete, or verify a tag object signed with GPG`);
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
    await new Brew().install();
    await spawn("sh", ["-c", "type git || brew install git"]);
  }
}

export default Git;
