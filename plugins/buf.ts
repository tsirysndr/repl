import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Buf implements Plugin {
  name = "buf";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      generate: (args: string[]) => spawn(this.name, ["generate", ...args]),
      breaking: (args: string[]) => spawn(this.name, ["breaking", ...args]),
      lint: (args: string[]) => spawn(this.name, ["lint", ...args]),
      format: (args: string[]) => spawn(this.name, ["format", ...args]),
      curl: (args: string[]) => spawn(this.name, ["curl", ...args]),
      convert: (args: string[]) => spawn(this.name, ["convert", ...args]),
      mod: (args: string[]) => spawn(this.name, ["mod", ...args]),
      registry: (args: string[]) => spawn(this.name, ["registry", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      export: (args: string[]) => spawn(this.name, ["export", ...args]),
      help: () => {
        console.log(`    Common Commands:
        build                         Build Protobuf files into a Buf image (key to many other buf operations)
        generate                      Generate code stubs from Protobuf files using protoc plugins
        breaking                      Verify no breaking changes have been made, to guard against compatibility issues
        lint,format                   Lint and format your Protobuf files according to best practice and your org rules
        curl                          Test your APIs by invoking an RPC endpoint, similar to using cURL
        convert                       Convert a message from binary to JSON or vice versa—useful when debugging or testing
        mod, registry, push, export   Manage your repositories in the Buf Schema Registry`);
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
    await spawn("sh", ["-c", "type buf > /dev/null || brew install buf"]);
  }
}

export default Buf;
