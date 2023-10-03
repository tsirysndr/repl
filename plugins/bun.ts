import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Bun implements Plugin {
  name = "bun";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      x: (args: string[]) => spawn(this.name, ["x", ...args]),
      repl: (args: string[]) => spawn(this.name, ["repl", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      remove: (args: string[]) => spawn(this.name, ["remove", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      link: (args: string[]) => spawn(this.name, ["link", ...args]),
      unlink: (args: string[]) => spawn(this.name, ["unlink", ...args]),
      pm: (args: string[]) => spawn(this.name, ["pm", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      help: () => {
        console.log(`Common Commands:
        run       Run JavaScript/TypeScript files or a package.json script
        test      Run unit tests with Jest-compatible test runner
        x         Install and execute a package bin (bunx)
        repl      Start a REPL session with Bun
        init      Start an empty Bun project from a blank template
        create    Create a new project from a template (bun c)
        install   Install dependencies for a package.json (bun i)
        add       Add a dependency to package.json (bun a)
        remove    Remove a dependency from package.json (bun rm)
        update    Update outdated dependencies & save to package.json
        link      Link an npm package globally
        unlink    Globally unlink an npm package
        pm        More commands for managing packages
        build     Bundle TypeScript & JavaScript into a single file
        upgrade   Get the latest version of Bun
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
}

export default Bun;
