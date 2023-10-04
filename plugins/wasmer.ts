import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Wasmer implements Plugin {
  name = "wasmer";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      publish: (args: string[]) => spawn(this.name, ["publish", ...args]),
      cache: (args: string[]) => spawn(this.name, ["cache", ...args]),
      validate: (args: string[]) => spawn(this.name, ["validate", ...args]),
      compile: (args: string[]) => spawn(this.name, ["compile", ...args]),
      "create-exe": (args: string[]) =>
        spawn(this.name, ["create-exe", ...args]),
      "create-obj": (args: string[]) =>
        spawn(this.name, ["create-obj", ...args]),
      "gen-c-header": (args: string[]) =>
        spawn(this.name, ["gen-c-header", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      "self-update": (args: string[]) =>
        spawn(this.name, ["self-update", ...args]),
      inspect: (args: string[]) => spawn(this.name, ["inspect", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      wast: (args: string[]) => spawn(this.name, ["wast", ...args]),
      binfmt: (args: string[]) => spawn(this.name, ["binfmt", ...args]),
      whoami: (args: string[]) => spawn(this.name, ["whoami", ...args]),
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      deploy: (args: string[]) => spawn(this.name, ["deploy", ...args]),
      app: (args: string[]) => spawn(this.name, ["app", ...args]),
      ssh: (args: string[]) => spawn(this.name, ["ssh", ...args]),
      namespace: (args: string[]) => spawn(this.name, ["namespace", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Commands:
        login         Login into a wasmer.io-like registry
        publish       Login into a wasmer.io-like registry
        cache         Wasmer cache
        validate      Validate a WebAssembly binary
        compile       Compile a WebAssembly binary
        create-exe    Compile a WebAssembly binary into a native executable
        create-obj    Compile a WebAssembly binary into an object file
        gen-c-header  Generate the C static_defs.h header file for the input .wasm module
        config        Get various configuration information needed to compile programs which use Wasmer
        self-update   Update wasmer to the latest version
        inspect       Inspect a WebAssembly file
        init          Initializes a new wasmer.toml file
        wast          Run spec testsuite
        binfmt        Unregister and/or register wasmer as binfmt interpreter
        whoami        Shows the current logged in user for the current active registry
        add           Add a Wasmer package's bindings to your application
        run           Run a WebAssembly file or Wasmer container
        deploy        Deploy apps to the Wasmer Edge
        app           Manage deployed apps
        ssh           Create a dynamic on the Deploy Edge, and connect to it through SSH
        namespace     Manage Wasmer namespaces
        version       Prints the Wasmer version information
        help          Print this message or the help of the given subcommand(s)`);
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
      "type wasmer > /dev/null || curl https://get.wasmer.io -sSfL | sh",
    ]);
    Deno.env.set("WASMER_DIR", "~/.wasmer");
    Deno.env.set("PATH", "~/.wasmer/bin:" + Deno.env.get("PATH"));
  }
}

export default Wasmer;
