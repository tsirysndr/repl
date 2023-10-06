import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Asdf implements Plugin {
  name = "asdf";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      plugin: (args: string[]) => spawn(this.name, ["plugin", ...args]),
      current: (args: string[]) => spawn(this.name, ["current", ...args]),
      global: (args: string[]) => spawn(this.name, ["global", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      latest: (args: string[]) => spawn(this.name, ["latest", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      local: (args: string[]) => spawn(this.name, ["local", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      uninstall: (args: string[]) => spawn(this.name, ["uninstall", ...args]),
      where: (args: string[]) => spawn(this.name, ["where", ...args]),
      which: (args: string[]) => spawn(this.name, ["which", ...args]),
      exec: (args: string[]) => spawn(this.name, ["exec", ...args]),
      env: (args: string[]) => spawn(this.name, ["env", ...args]),
      info: () => spawn(this.name, ["info"]),
      reshim: (args: string[]) => spawn(this.name, ["reshim", ...args]),
      shim_versions: (args: string[]) =>
        spawn(this.name, ["shim-versions", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      help: (args: string[]) => {
        if (Array.isArray(args) && args.length !== 0) {
          return spawn(this.name, ["help", ...args]);
        }
        console.log(`
          MANAGE PLUGINS
              plugin add <name> [<git-url>]       Add a plugin from the plugin repo OR,
                                                  add a Git repo as a plugin by
                                                  specifying the name and repo url
              plugin list [--urls] [--refs]       List installed plugins. Optionally show
                                                  git urls and git-ref
              plugin list all                     List plugins registered on asdf-plugins
                                                  repository with URLs
              plugin remove <name>                Remove plugin and package versions
              plugin update <name> [<git-ref>]    Update a plugin to latest commit on
                                                  default branch or a particular git-ref
              plugin update --all                 Update all plugins to latest commit on
                                                  default branch

          MANAGE PACKAGES
              current                             Display current version set or being
                                                  used for all packages
              current <name>                      Display current version set or being
                                                  used for package
              global <name> <version>             Set the package global version
              global <name> latest[:<version>]    Set the package global version to the
                                                  latest provided version
              help <name> [<version>]             Output documentation for plugin and tool
              install                             Install all the package versions listed
                                                  in the .tool-versions file
              install <name>                      Install one tool at the version
                                                  specified in the .tool-versions file
              install <name> <version>            Install a specific version of a package
              install <name> latest[:<version>]   Install the latest stable version of a
                                                  package, or with optional version,
                                                  install the latest stable version that
                                                  begins with the given string
              latest <name> [<version>]           Show latest stable version of a package
              latest --all                        Show latest stable version of all the
                                                  packages and if they are installed
              list <name> [version]               List installed versions of a package and
                                                  optionally filter the versions
              list all <name> [<version>]         List all versions of a package and
                                                  optionally filter the returned versions
              local <name> <version>              Set the package local version
              local <name> latest[:<version>]     Set the package local version to the
                                                  latest provided version
              shell <name> <version>              Set the package version to
                                                  'ASDF_$_{LANG}_VERSION' in the current shell
              uninstall <name> <version>          Remove a specific version of a package
              where <name> [<version>]            Display install path for an installed
                                                  or current version
              which <command>                     Display the path to an executable
          
          UTILS
              exec <command> [args...]            Executes the command shim for current version
              env <command> [util]                Runs util (default: 'env') inside the
                                                  environment used for command shim execution.
              info                                Print OS, Shell and ASDF debug information.
              reshim <name> <version>             Recreate shims for version of a package
              shim-versions <command>             List the plugins and versions that
                                                  provide a command
              update                              Update asdf to the latest stable release
              update --head                       Update asdf to the latest on the master branch
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
    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    await new Brew().install();

    // asdf primarily requires `git` & `curl`.
    await spawn("sh", ["-c", "type git > /dev/null || brew install git"]);
    await spawn("sh", ["-c", "type curl > /dev/null || brew install curl"]);
    await spawn("sh", ["-c", "type asdf > /dev/null || brew install asdf"]);
  }
}

export default Asdf;
