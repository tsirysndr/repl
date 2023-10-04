import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Bazel implements Plugin {
  name = "bazel";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      "analyze-profile": (args: string[]) =>
        spawn(this.name, ["analyze-profile", ...args]),
      aquery: (args: string[]) => spawn(this.name, ["aquery", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      "canonicalize-flags": (args: string[]) =>
        spawn(this.name, ["canonicalize-flags", ...args]),
      clean: (args: string[]) => spawn(this.name, ["clean", ...args]),
      coverage: (args: string[]) => spawn(this.name, ["coverage", ...args]),
      cquery: (args: string[]) => spawn(this.name, ["cquery", ...args]),
      dump: (args: string[]) => spawn(this.name, ["dump", ...args]),
      fetch: (args: string[]) => spawn(this.name, ["fetch", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      license: (args: string[]) => spawn(this.name, ["license", ...args]),
      "mobile-install": (args: string[]) =>
        spawn(this.name, ["mobile-install", ...args]),
      mod: (args: string[]) => spawn(this.name, ["mod", ...args]),
      print_action: (args: string[]) =>
        spawn(this.name, ["print_action", ...args]),
      query: (args: string[]) => spawn(this.name, ["query", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      shutdown: (args: string[]) => spawn(this.name, ["shutdown", ...args]),
      sync: (args: string[]) => spawn(this.name, ["sync", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Available commands:
        analyze-profile     Analyzes build profile data.
        aquery              Analyzes the given targets and queries the action graph.
        build               Builds the specified targets.
        canonicalize-flags  Canonicalizes a list of bazel options.
        clean               Removes output files and optionally stops the server.
        coverage            Generates code coverage report for specified test targets.
        cquery              Loads, analyzes, and queries the specified targets w/ configurations.
        dump                Dumps the internal state of the bazel server process.
        fetch               Fetches external repositories that are prerequisites to the targets.
        help                Prints help for commands, or the index.
        info                Displays runtime info about the bazel server.
        license             Prints the license of this software.
        mobile-install      Installs targets to mobile devices.
        mod                 Queries the Bzlmod external dependency graph
        print_action        Prints the command line args for compiling a file.
        query               Executes a dependency graph query.
        run                 Runs the specified target.
        shutdown            Stops the bazel server.
        sync                Syncs all repositories specified in the workspace file
        test                Builds and runs the specified test targets.
        version             Prints version information for bazel.`);
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

export default Bazel;
