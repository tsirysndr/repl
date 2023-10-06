import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class GithubCLI implements Plugin {
  name = "gh";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      browse: (args: string[]) => spawn(this.name, ["browse", ...args]),
      codespace: (args: string[]) => spawn(this.name, ["codespace", ...args]),
      gist: (args: string[]) => spawn(this.name, ["gist", ...args]),
      issue: (args: string[]) => spawn(this.name, ["issue", ...args]),
      org: (args: string[]) => spawn(this.name, ["org", ...args]),
      pr: (args: string[]) => spawn(this.name, ["pr", ...args]),
      project: (args: string[]) => spawn(this.name, ["project", ...args]),
      release: (args: string[]) => spawn(this.name, ["release", ...args]),
      repo: (args: string[]) => spawn(this.name, ["repo", ...args]),
      cache: (args: string[]) => spawn(this.name, ["cache", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      workflow: (args: string[]) => spawn(this.name, ["workflow", ...args]),
      co: (args: string[]) => spawn(this.name, ["pr", "checkout", ...args]),
      alias: (args: string[]) => spawn(this.name, ["alias", ...args]),
      api: (args: string[]) => spawn(this.name, ["api", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      extension: (args: string[]) => spawn(this.name, ["extension", ...args]),
      "gpg-key": (args: string[]) => spawn(this.name, ["gpg-key", ...args]),
      label: (args: string[]) => spawn(this.name, ["label", ...args]),
      ruleset: (args: string[]) => spawn(this.name, ["ruleset", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      secret: (args: string[]) => spawn(this.name, ["secret", ...args]),
      "ssh-key": (args: string[]) => spawn(this.name, ["ssh-key", ...args]),
      status: (args: string[]) => spawn(this.name, ["status", ...args]),
      variable: (args: string[]) => spawn(this.name, ["variable", ...args]),
      actions: (args: string[]) => spawn(this.name, ["actions", ...args]),
      environment: (args: string[]) =>
        spawn(this.name, ["environment", ...args]),
      "exit-codes": (args: string[]) =>
        spawn(this.name, ["exit-codes", ...args]),
      formatting: (args: string[]) => spawn(this.name, ["formatting", ...args]),
      mintty: (args: string[]) => spawn(this.name, ["mintty", ...args]),
      reference: (args: string[]) => spawn(this.name, ["reference", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    CORE COMMANDS
        auth:        Authenticate gh and git with GitHub
        browse:      Open the repository in the browser
        codespace:   Connect to and manage codespaces
        gist:        Manage gists
        issue:       Manage issues
        org:         Manage organizations
        pr:          Manage pull requests
        project:     Work with GitHub Projects.
        release:     Manage releases
        repo:        Manage repositories
      
      GITHUB ACTIONS COMMANDS
        cache:       Manage Github Actions caches
        run:         View details about workflow runs
        workflow:    View details about GitHub Actions workflows
      
      ALIAS COMMANDS
        co:          Alias for "pr checkout"
      
      ADDITIONAL COMMANDS
        alias:       Create command shortcuts
        api:         Make an authenticated GitHub API request
        completion:  Generate shell completion scripts
        config:      Manage configuration for gh
        extension:   Manage gh extensions
        gpg-key:     Manage GPG keys
        label:       Manage labels
        ruleset:     View info about repo rulesets
        search:      Search for repositories, issues, and pull requests
        secret:      Manage GitHub secrets
        ssh-key:     Manage SSH keys
        status:      Print information about relevant issues, pull requests, and notifications across repositories
        variable:    Manage GitHub Actions variables
      
      HELP TOPICS
        actions:     Learn about working with GitHub Actions
        environment: Environment variables that can be used with gh
        exit-codes:  Exit codes used by gh
        formatting:  Formatting options for JSON data exported from gh
        mintty:      Information about using gh with MinTTY
        reference:   A comprehensive reference of all gh commands
        version:     Print the version of Github CLI`);
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
    await spawn("sh", ["-c", "type gh > /dev/null || brew install gh"]);
  }
}

export default GithubCLI;
