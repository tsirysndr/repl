import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Nix from "./nix.ts";

class HomeManager implements Plugin {
  name = "home-manager";
  hm = ["run", "home-manager/master"];
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      edit: (args: string[]) => spawn("nix", [...this.hm, "edit", ...args]),
      option: (args: string[]) => spawn("nix", [...this.hm, "option", ...args]),
      build: (args: string[]) => spawn("nix", [...this.hm, "build", ...args]),
      init: (args: string[]) => spawn("nix", [...this.hm, "init", ...args]),
      instantiate: (args: string[]) =>
        spawn("nix", [...this.hm, "instantiate", ...args]),
      switch: (args: string[]) => spawn("nix", [...this.hm, "switch", ...args]),
      generations: (args: string[]) =>
        spawn("nix", [...this.hm, "generations", ...args]),
      "remove-generations": (args: string[]) =>
        spawn("nix", [...this.hm, "remove-generations", ...args]),
      "expire-generations": (args: string[]) =>
        spawn("nix", [...this.hm, "expire-generations", ...args]),
      packages: (args: string[]) =>
        spawn("nix", [...this.hm, "packages", ...args]),
      news: (args: string[]) => spawn("nix", [...this.hm, "news", ...args]),
      uninstall: (args: string[]) =>
        spawn("nix", [...this.hm, "uninstall", ...args]),
      version: (args: string[]) =>
        spawn("nix", [...this.hm, "--", "--version", ...args]),
      help: () => {
        console.log(`    Commands

        help         Print this help
      
        edit         Open the home configuration in $EDITOR
      
        option OPTION.NAME
                     Inspect configuration option named OPTION.NAME.
      
        build        Build configuration into result directory
      
        init [--switch] [DIR]
            Initializes a configuration in the given directory. If the directory
            does not exist, then it will be created. The default directory is
            '~/.config/home-manager'.
      
            --switch      Immediately activate the generated configuration.
      
        instantiate  Instantiate the configuration and print the resulting derivation
      
        switch       Build and activate configuration
      
        generations  List all home environment generations
      
        remove-generations ID...
            Remove indicated generations. Use 'generations' command to
            find suitable generation numbers.
      
        expire-generations TIMESTAMP
            Remove generations older than TIMESTAMP where TIMESTAMP is
            interpreted as in the -d argument of the date tool. For
            example "-30 days" or "2018-01-01".
      
        packages     List all packages installed in home-manager-path
      
        news         Show news entries in a pager
      
        uninstall    Remove Home Manager
        
        version      Show Home Manager version`);
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
    await new Nix().install();
    await spawn("sh", [
      "-c",
      "[ ! -f ~/.config/home-manager/home.nix ] && nix run home-manager/master init",
    ]);
  }
}

export default HomeManager;
