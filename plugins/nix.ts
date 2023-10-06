import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Nix implements Plugin {
  name = "nix";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      "help-stores": (args: string[]) =>
        spawn(this.name, ["help-stores", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      develop: (args: string[]) => spawn(this.name, ["develop", ...args]),
      flake: (args: string[]) => spawn(this.name, ["flake", ...args]),
      profile: (args: string[]) => spawn(this.name, ["profile", ...args]),
      repl: (args: string[]) => spawn(this.name, ["repl", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      bundle: (args: string[]) => spawn(this.name, ["bundle", ...args]),
      copy: (args: string[]) => spawn(this.name, ["copy", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      eval: (args: string[]) => spawn(this.name, ["eval", ...args]),
      fmt: (args: string[]) => spawn(this.name, ["fmt", ...args]),
      log: (args: string[]) => spawn(this.name, ["log", ...args]),
      "path-info": (args: string[]) => spawn(this.name, ["path-info", ...args]),
      registry: (args: string[]) => spawn(this.name, ["registry", ...args]),
      "why-depends": (args: string[]) =>
        spawn(this.name, ["why-depends", ...args]),
      daemon: (args: string[]) => spawn(this.name, ["daemon", ...args]),
      derivation: (args: string[]) => spawn(this.name, ["derivation", ...args]),
      hash: (args: string[]) => spawn(this.name, ["hash", ...args]),
      key: (args: string[]) => spawn(this.name, ["key", ...args]),
      nar: (args: string[]) => spawn(this.name, ["nar", ...args]),
      "print-dev-env": (args: string[]) =>
        spawn(this.name, ["print-dev-env", ...args]),
      realisation: (args: string[]) =>
        spawn(this.name, ["realisation", ...args]),
      "show-config": (args: string[]) =>
        spawn(this.name, ["show-config", ...args]),
      store: (args: string[]) => spawn(this.name, ["store", ...args]),
      doctor: (args: string[]) => spawn(this.name, ["doctor", ...args]),
      "upgrade-nix": (args: string[]) =>
        spawn(this.name, ["upgrade-nix", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Help commands:

        · help - show help about nix or a particular subcommand 
        · help-stores - show help about store types and their settings 
        . version - show the version of Nix
    
        Main commands:
    
        · build - build a derivation or fetch a store path 
        · develop - run a bash shell that provides the build environment of a derivation 
        · flake - manage Nix flakes 
        · profile - manage Nix profiles 
        · repl - start an interactive environment for evaluating Nix expressions 
        · run - run a Nix application 
        · search - search for packages 
        · shell - run a shell in which the specified packages are available 
    
        Infrequently used commands:
    
        · bundle - bundle an application so that it works outside of the Nix store 
        · copy - copy paths between Nix stores 
        · develop - run a bash shell that provides the build environment of a derivation 
        · flake - manage Nix flakes 
        · profile - manage Nix profiles 
        · repl - start an interactive environment for evaluating Nix expressions 
        · run - run a Nix application 
        · search - search for packages 
        · shell - run a shell in which the specified packages are available 
    
        Infrequently used commands:
    
        · bundle - bundle an application so that it works outside of the Nix store 
        · copy - copy paths between Nix stores 
        · edit - open the Nix expression of a Nix package in $EDITOR 
        · eval - evaluate a Nix expression 
        · fmt - reformat your code in the standard style 
        · log - show the build log of the specified packages or paths, if available 
        · path-info - query information about store paths 
        · registry - manage the flake registry 
        · why-depends - show why a package has another package in its closure 
    
        Utility/scripting commands:
    
        · daemon - daemon to perform store operations on behalf of non-root clients 
        · derivation - Work with derivations, Nix's notion of a build plan. 
        · hash - compute and convert cryptographic hashes 
        · key - generate and convert Nix signing keys 
        · nar - create or inspect NAR files 
        · print-dev-env - print shell code that can be sourced by bash to reproduce the build environment of a derivation 
        · realisation - manipulate a Nix realisation 
        · show-config - show the Nix configuration or the value of a specific setting 
        · store - manipulate a Nix store 
    
        Commands for upgrading or troubleshooting your Nix installation:
    
        · doctor - check your system for potential problems and print a PASS or FAIL for each check 
        · upgrade-nix - upgrade Nix to the stable version declared in Nixpkgs 
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
      "type nix > /dev/null || curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install",
    ]);
    Deno.env.set(
      "PATH",
      `${Deno.env.get("PATH")}:/nix/var/nix/profiles/default/bin`
    );
  }
}

export default Nix;
