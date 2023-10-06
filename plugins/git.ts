import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Git implements Plugin {
  name = "git";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      mv: (args: string[]) => spawn(this.name, ["mv", ...args]),
      restore: (args: string[]) => spawn(this.name, ["restore", ...args]),
      rm: (args: string[]) => spawn(this.name, ["rm", ...args]),
      checkout: (args: string[]) => spawn(this.name, ["checkout", ...args]),
      bisect: (args: string[]) => spawn(this.name, ["bisect", ...args]),
      diff: (args: string[]) => spawn(this.name, ["diff", ...args]),
      grep: (args: string[]) => spawn(this.name, ["grep", ...args]),
      show: (args: string[]) => spawn(this.name, ["show", ...args]),
      rebase: (args: string[]) => spawn(this.name, ["rebase", ...args]),
      "cherry-pick": (args: string[]) =>
        spawn(this.name, ["cherry-pick", ...args]),
      reset: (args: string[]) => spawn(this.name, ["reset", ...args]),
      switch: (args: string[]) => spawn(this.name, ["switch", ...args]),
      fetch: (args: string[]) => spawn(this.name, ["fetch", ...args]),
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
        add         Add file contents to the index
        init        Create an empty Git repository or reinitialize an existing one
        mv          Move or rename a file, a directory, or a symlink
        restore     Restore working tree files
        rm          Remove files from the working tree and from the index
        checkout    Switch branches or restore working tree files
        bisect      Use binary search to find the commit that introduced a bug
        diff        Show changes between commits, commit and working tree, etc
        grep        Print lines matching a pattern
        show        Show various types of objects
        rebase      Reapply commits on top of another base tip
        reset       Reset current HEAD to the specified state
        switch      Switch branches
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
    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type git > /dev/null || brew install git"]);
  }
}

export default Git;
