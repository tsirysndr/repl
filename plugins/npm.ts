import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Npm implements Plugin {
  name = "npm";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      access: (args: string[]) => spawn(this.name, ["access", ...args]),
      adduser: (args: string[]) => spawn(this.name, ["adduser", ...args]),
      audit: (args: string[]) => spawn(this.name, ["audit", ...args]),
      bugs: (args: string[]) => spawn(this.name, ["bugs", ...args]),
      cache: (args: string[]) => spawn(this.name, ["cache", ...args]),
      ci: (args: string[]) => spawn(this.name, ["ci", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      dedupe: (args: string[]) => spawn(this.name, ["dedupe", ...args]),
      deprecate: (args: string[]) => spawn(this.name, ["deprecate", ...args]),
      diff: (args: string[]) => spawn(this.name, ["diff", ...args]),
      "dist-tag": (args: string[]) => spawn(this.name, ["dist-tag", ...args]),
      docs: (args: string[]) => spawn(this.name, ["docs", ...args]),
      doctor: (args: string[]) => spawn(this.name, ["doctor", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      exec: (args: string[]) => spawn(this.name, ["exec", ...args]),
      explain: (args: string[]) => spawn(this.name, ["explain", ...args]),
      explore: (args: string[]) => spawn(this.name, ["explore", ...args]),
      "find-dupes": (args: string[]) =>
        spawn(this.name, ["find-dupes", ...args]),
      fund: (args: string[]) => spawn(this.name, ["fund", ...args]),
      "help-search": (args: string[]) =>
        spawn(this.name, ["help-search", ...args]),
      hook: (args: string[]) => spawn(this.name, ["hook", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      "install-ci-test": (args: string[]) =>
        spawn(this.name, ["install-ci-test", ...args]),
      "install-test": (args: string[]) =>
        spawn(this.name, ["install-test", ...args]),
      link: (args: string[]) => spawn(this.name, ["link", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      ls: (args: string[]) => spawn(this.name, ["ls", ...args]),
      org: (args: string[]) => spawn(this.name, ["org", ...args]),
      outdate: (args: string[]) => spawn(this.name, ["outdate", ...args]),
      owner: (args: string[]) => spawn(this.name, ["owner", ...args]),
      pack: (args: string[]) => spawn(this.name, ["pack", ...args]),
      pkg: (args: string[]) => spawn(this.name, ["pkg", ...args]),
      prefix: (args: string[]) => spawn(this.name, ["prefix", ...args]),
      profile: (args: string[]) => spawn(this.name, ["profile", ...args]),
      prune: (args: string[]) => spawn(this.name, ["prune", ...args]),
      publish: (args: string[]) => spawn(this.name, ["publish", ...args]),
      query: (args: string[]) => spawn(this.name, ["query", ...args]),
      rebuild: (args: string[]) => spawn(this.name, ["rebuild", ...args]),
      repo: (args: string[]) => spawn(this.name, ["repo", ...args]),
      restart: (args: string[]) => spawn(this.name, ["restart", ...args]),
      root: (args: string[]) => spawn(this.name, ["root", ...args]),
      "run-script": (args: string[]) =>
        spawn(this.name, ["run-script", ...args]),
      sbom: (args: string[]) => spawn(this.name, ["sbom", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      shrinkwrap: (args: string[]) => spawn(this.name, ["shrinkwrap", ...args]),
      star: (args: string[]) => spawn(this.name, ["star", ...args]),
      stars: (args: string[]) => spawn(this.name, ["stars", ...args]),
      start: (args: string[]) => spawn(this.name, ["start", ...args]),
      stop: (args: string[]) => spawn(this.name, ["stop", ...args]),
      team: (args: string[]) => spawn(this.name, ["team", ...args]),
      test: (args: string[]) => spawn(this.name, ["test", ...args]),
      token: (args: string[]) => spawn(this.name, ["token", ...args]),
      uninstall: (args: string[]) => spawn(this.name, ["uninstall", ...args]),
      unpblish: (args: string[]) => spawn(this.name, ["unpblish", ...args]),
      unstart: (args: string[]) => spawn(this.name, ["unstart", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      view: (args: string[]) => spawn(this.name, ["view", ...args]),
      whoami: (args: string[]) => spawn(this.name, ["whoami", ...args]),
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
        whoami           Display npm username`);
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

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type npm > /dev/null || brew install npm"]);
  }
}
export default Npm;
