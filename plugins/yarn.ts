import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Yarn implements Plugin {
  name = "yarn";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      add: (args: string[]) => spawn(this.name, ["add", ...args]),
      audit: (args: string[]) => spawn(this.name, ["audit", ...args]),
      autoclean: (args: string[]) => spawn(this.name, ["autoclean", ...args]),
      bin: (args: string[]) => spawn(this.name, ["bin", ...args]),
      cache: (args: string[]) => spawn(this.name, ["cache", ...args]),
      check: (args: string[]) => spawn(this.name, ["check", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      dedupe: (args: string[]) => spawn(this.name, ["dedupe", ...args]),
      "generate-lock-entry": (args: string[]) =>
        spawn(this.name, ["generate-lock-entry", ...args]),
      global: (args: string[]) => spawn(this.name, ["global", ...args]),
      import: (args: string[]) => spawn(this.name, ["import", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      licenses: (args: string[]) => spawn(this.name, ["licenses", ...args]),
      link: (args: string[]) => spawn(this.name, ["link", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      lockfile: (args: string[]) => spawn(this.name, ["lockfile", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      outdate: (args: string[]) => spawn(this.name, ["outdate", ...args]),
      owner: (args: string[]) => spawn(this.name, ["owner", ...args]),
      pack: (args: string[]) => spawn(this.name, ["pack", ...args]),
      policies: (args: string[]) => spawn(this.name, ["policies", ...args]),
      prune: (args: string[]) => spawn(this.name, ["prune", ...args]),
      publish: (args: string[]) => spawn(this.name, ["publish", ...args]),
      remove: (args: string[]) => spawn(this.name, ["remove", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      "self-update": (args: string[]) =>
        spawn(this.name, ["self-update", ...args]),
      tag: (args: string[]) => spawn(this.name, ["tag", ...args]),
      team: (args: string[]) => spawn(this.name, ["team", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      unlink: (args: string[]) => spawn(this.name, ["unlink", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      "upgrade-interactive": (args: string[]) =>
        spawn(this.name, ["upgrade-interactive", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      versions: (args: string[]) => spawn(this.name, ["versions", ...args]),
      why: (args: string[]) => spawn(this.name, ["why", ...args]),
      workspace: (args: string[]) => spawn(this.name, ["workspace", ...args]),
      workspaces: (args: string[]) => spawn(this.name, ["workspaces", ...args]),
      help: () => {
        console.log(`    Yarn Commands:
      add                  Installs a package and any packages that it depends on
      audit                Perform a vulnerability audit against the installed packages
      autoclean            Cleans and removes unnecessary files from package dependencies
      bin                  Display the location of the yarn bin folder
      cache                Displays information about the cache
      check                Verifies that versions of the package dependencies match the yarn.lock file
      config               Manages the yarn configuration files
      create               Creates new projects from any create-* starter kits
      generate-lock-entry  Generates a lock entry file entry
      global               Installs packages globally on your operating system
      import               Generates yarn.lock from an npm package-lock.json file in the same location or an existing npm-installed node_modules folder
      info                 Show information about a package
      init                 Interactively creates or updates a package.json file
      install              Installs all dependencies listed in a package.json file
      licenses             List licenses for installed packages
      link                 Symlink a package folder during development
      list                 List installed packages
      login                Store registry username and email
      logout               Clear registry username and email
      outdate              Checks for outdated packages dependencies
      owner                Manages package owners
      pack                 Creates a compressed gzip archive of package dependencies
      policies             Defines project-wide policies for your project
      publish              Publishes a package to the npm registry
      remove               Removes a package from the project
      run                  Runs a defined package script
      self-update          Updates Yarn to the latest version
      tag                  Add, remove, or list tags on a package
      team                 Maintain team memberships
      test                 Runs the tests script defined by the package
      unlink               Unlink a previously created symlink for a package
      upgrade              Upgrades packages to their latest version based on the specified range
      upgrade-interactive  This is similar to npm-check interactive update mode. It provides an easy way to update outdated packages
      version              Updates the package version
      versions             Displays version information of the currently installed Yarn, Node.js, and its dependencies
      why                  Show information about why a package is installed
      workspace            install dependencies from multiple package.json files in subfolders of a single root package.json file, all in one go
      workspaces           Show information about your workspaces`);
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
    if (cmd === "help") {
      return;
    }

    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type yarn > /dev/null || brew install yarn"]);
  }
}
export default Yarn;
