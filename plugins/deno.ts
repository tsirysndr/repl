import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Deno implements Plugin {
  name = "deno";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      bundle: (args: string[]) => spawn(this.name, ["bundle", ...args]),
      cache: (args: string[]) => spawn(this.name, ["cache", ...args]),
      completions: (args: string[]) =>
        spawn(this.name, ["completions", ...args]),
      doc: (args: string[]) => spawn(this.name, ["doc", ...args]),
      eval: (args: string[]) => spawn(this.name, ["eval", ...args]),
      fmt: (args: string[]) => spawn(this.name, ["fmt", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      repl: (args: string[]) => spawn(this.name, ["repl", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      types: (args: string[]) => spawn(this.name, ["types", ...args]),
      check: (args: string[]) => spawn(this.name, ["check", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Common Commands:
        bundle         Bundle module and dependencies into single file
        cache          Cache the dependencies
        completions    Generate shell completions
        doc            Show documentation for a module
        eval           Eval script
        fmt            Format source files
        info           Show info about cache or info related to source file
        install        Install script as an executable
        repl           Read Eval Print Loop
        run            Run a program given a filename or url to the module
        test           Run tests
        types          Print runtime TypeScript declarations
        check          Type-check your code without executing it 
        upgrade        Upgrade deno executable to newest version
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

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type deno || brew install deno"]);
  }
}

export default Deno;
