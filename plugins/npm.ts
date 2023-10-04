import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Npm implements Plugin {
  name = "npm";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      access: (args: string[]) => spawn(this.name, ["install", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      help: () => {
        console.log(`    NPM Commands:
      access           Change access level on published packages
      adduser          Add a registry user account
      audit            Run a security audit
      bugs             Bugs for a package in a web browser maybe
      cache            Manipulates the packages cache
      ci               Install a project with a clean slate
      completion       Tab completion script
      config           Manage the npm configuration files
      dedupe           Reduce duplication in the dependency tree
      deprecate        Deprecate a version of a package
      diff             The registered diff command
      dist-tag         Modify package distribution tags
      docs             Docs for a package in a web browser maybe
      doctor           Check your environment for known issues
      edit             Edit an installed package
      exec             Run a command from a npm package
      explain          Explain installed packages
      explore          Browse an installed package
      find-dupes       Find duplication in the package tree
      fund             Retrieve funding information for a package
      help             Search npm help documentation
      help-search      Get help on npm keywords
      hook             Manage registry hooks
      init             Create a package.json file
      install          Install a package and any packages that it depends on
      install-ci-test  Install a project with a clean slate and run tests
      install-test     Install package(s) and run tests
      link             Symlink a package folder
      login            Login to a registry user account
      logout           Log out of the registry
      ls               List installed packages
      org              Manage orgs
      outdated         Check for outdated packages
      owner            Manage package owners
      pack             Create a tarball from a package
      pkg              Manages your package.json
      prefix           Display prefix
      profile          Change settings on your registry profile
      prune            Remove extraneous packages
      publish          Publish a package
      query            Retrieve a filtered list of packages
      rebuild          Rebuild a package
      repo             Open package repository page in the browser
      restart          Restart a package
      root             Display npm root
      run-script       Run arbitrary package scripts
      sbom             Generate a Software Bill of Materials (SBOM)
      search           Search for packages
      shrinkwrap       Lock down dependency versions for publication
      star             Mark your favorite packages
      stars            View packages marked as favorites
      start            Start a package
      stop             Stop a package
      team             Manage organization teams and team memberships
      test             Test a package
      token            Manage your authentication tokens
      uninstall        Remove a package
      unpublish        Remove a package from the registry
      unstar           Remove an item from your favorite packages
      update           Update a package
      version          Bump a package version
      view             View registry info
      whoami           Display npm username
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
    if (cmd === "help") {
      return;
    }

    console.log("Command not found");
  }
}
export default Npm;
