import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Spin implements Plugin {
  name = "spin";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      cloud: (args: string[]) => spawn(this.name, ["cloud", ...args]),
      deploy: (args: string[]) => spawn(this.name, ["deploy", ...args]),
      doctor: (args: string[]) => spawn(this.name, ["doctor", ...args]),
      js2wasm: (args: string[]) => spawn(this.name, ["js2wasm", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      new: (args: string[]) => spawn(this.name, ["new", ...args]),
      plugins: (args: string[]) => spawn(this.name, ["plugins", ...args]),
      py2wasm: (args: string[]) => spawn(this.name, ["py2wasm", ...args]),
      registry: (args: string[]) => spawn(this.name, ["registry", ...args]),
      templates: (args: string[]) => spawn(this.name, ["templates", ...args]),
      up: (args: string[]) => spawn(this.name, ["up", ...args]),
      watch: (args: string[]) => spawn(this.name, ["watch", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Available Commands:
        add          Scaffold a new component into an existing application
        build        Build the Spin application
        cloud*       Commands for publishing applications to the Fermyon Cloud.
        deploy       Package and upload an application to the Fermyon Cloud.
        doctor       Detect and fix problems with Spin applications
        help         Print this message or the help of the given subcommand(s)
        js2wasm*     A plugin to convert js files to Spin compatible modules
        login        Log into the Fermyon Cloud.
        new          Scaffold a new application based on a template
        plugins      Install/uninstall Spin plugins
        py2wasm*     A plugin to convert Python applications to Spin compatible modules
        registry     Commands for working with OCI registries to distribute applications
        templates    Commands for working with WebAssembly component templates
        up           Start the Spin application
        watch        Build and run the Spin application, rebuilding and restarting it when files
                        change
        version      Print the version of Spin
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
    await spawn("sh", [
      "-c",
      "type spin > /dev/null || (cd /usr/local/bin && curl -fsSL https://developer.fermyon.com/downloads/install.sh | sudo bash)",
    ]);
  }
}

export default Spin;
